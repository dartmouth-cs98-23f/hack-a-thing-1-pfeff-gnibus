import CourseInput from './components/CourseInput';
import { DateArray, createEvents } from 'ics';
import './index.css';
import { useState, useEffect } from 'react';
import CourseCards from './components/CourseCards';
import { ICalendarYear, IClass } from './types.ts';
import { message, Button, Divider, Checkbox } from 'antd';
import { NavLink } from 'react-router-dom';
import fetchAcademicCalendar from './utils/fetchAcademicCalendar.ts';
import { useAppSelector, useAppDispatch } from './hooks'
import { resetStatus } from './components/classesSlice.ts'
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { format, addDays, startOfWeek, startOfDay, isSameDay } from 'date-fns';




function App() {
  const [keyDates, setKeyDates] = useState<ICalendarYear | undefined>();
  const [term, setTerm] = useState<string | undefined>();
  const [messageApi, contextHolder] = message.useMessage();
  const [includeXHour, setIncludeXHour] = useState(true);
  const classes = useAppSelector((state) => state.classes.classesList)
  const status = useAppSelector((state) => state.classes.status)
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchDates() {
      try {
        const dates = await fetchAcademicCalendar();
        setKeyDates(dates);
      } catch (error) {
        console.log('fetch dates error', error);
      }
    }
    fetchDates();
  }, []);

  useEffect(() => {
    if (keyDates) {
      const date = new Date();
      Object.keys(keyDates).forEach((termKey) => {
        const term = termKey as keyof ICalendarYear
        const [startDate, endDate] = keyDates[term];
        if (date >= startDate && date <= endDate) {
          const acronyms = {
            summer: 'X',
            fall: 'F',
            winter: 'W',
            spring: 'S',
          }
          setTerm(term)
        }
      });
    }
  }, [keyDates]);

  useEffect(() => {
    if (status === 'success') {
      messageApi.open({
        type: 'success',
        content: 'Added course to calendar!',
      });
    } else if (status === 'error') {
      messageApi.open({
        type: 'error',
        content: 'You\'ve already added this course!',
      });
    } else if (status === 'remove-success') {
      messageApi.open({
        type: 'success',
        content: 'Removed course from calendar!',
      });
    } else if (status === 'overlap') {
      messageApi.open({
        type: 'error',
        content: 'Course overlaps with current schedule!',
      });
    }
    dispatch(resetStatus())
  }, [status])

  const onChange = (e: CheckboxChangeEvent) => {
    setIncludeXHour(e.target.checked);
  };

  // adapted from ics npm documentation
  async function handleDownload() {
    const filename = 'course_calendar.ics';

    if (classes.length === 0) {
      messageApi.open({
        type: 'error',
        content: 'You haven\'t added any courses!',
      });
      return;
    }

    const generateEvents = () => {
      if (keyDates) {
        const events = [];
        for (const classObj of classes) {
          const date = new Date();

          const endYear = keyDates[term as keyof ICalendarYear][1].getFullYear();
          const endMonth = String(keyDates[term as keyof ICalendarYear][1].getMonth() + 1).padStart(2, '0');
          const endDay = String(keyDates[term as keyof ICalendarYear][1].getDate()).padStart(2, '0');
          const endDate = `${endYear}${endMonth}${endDay}`;

          const startYear = keyDates[term as keyof ICalendarYear][0].getFullYear();
          const startMonth = keyDates[term as keyof ICalendarYear][0].getMonth() + 1;
          const startDay = keyDates[term as keyof ICalendarYear][0].getDate();

          // chatGPT helped with this function
          const findNextOccurrance = (startDate: Date, day: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SU') => {
            const dateCodes = {
              'SU': 0,
              'MO': 1,
              'TU': 2,
              'WE': 3,
              'TH': 4,
              'FR': 5,
            }
            const targetDate = startOfWeek(startDate, { weekStartsOn: dateCodes[day] as 0 | 1 | 2 | 3 | 4 | 5 });

            if (targetDate < startDate) {
              const newDate = addDays(targetDate, 7);
              return newDate;
              //[format(newDate, 'yyyy'), format(newDate, 'MM'), format(newDate, 'dd')]
            }
            return targetDate;
            //[format(targetDate, 'yyyy'), format(targetDate, 'MM'), format(targetDate, 'dd')]
          };

          // find start date
          if (classObj.main) {
            const startArray = []
            let earliest = new Date('9/15/2099');
            for (const day of classObj.main?.days) {
              const temp = findNextOccurrance(keyDates[term as keyof ICalendarYear][0], day as 'MO' | 'TU' | 'WE' | 'TH' | 'FR')
              if (temp < earliest) {
                earliest = temp;
              }
            }

            // possible issues - calcualte first occurance of day in the first week as one thing. figure out how to make sure it is on or after; also, the recurrence rule until is not inclusive for end dates
            events.push({
              title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
              description: `${classObj.instructor} ${classObj.location}`,
              location: classObj.location,
              start: [parseInt(format(earliest, 'yyyy')), parseInt(format(earliest, 'MM')), parseInt(format(earliest, 'dd')), classObj.main?.time[0], classObj.main?.time[1]] as DateArray,
              duration: { hours: classObj.main?.time[2], minutes: classObj.main?.time[3] },
              recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.main?.days.join(',')};INTERVAL=1;UNTIL=${endDate}`
            });

          }

          // adding x hour if option selected
          if (classObj.xHour && includeXHour) {

            let earliest = new Date('9/15/2099');
            for (const day of classObj.xHour.days) {
              const temp = findNextOccurrance(keyDates[term as keyof ICalendarYear][0], day as 'MO' | 'TU' | 'WE' | 'TH' | 'FR')
              if (temp < earliest) {
                earliest = temp;
              }
            }
            events.push({
              title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle} X-Hour`,
              description: `${classObj.instructor} ${classObj.location} X-Hour`,
              location: classObj.location,
              start: [parseInt(format(earliest, 'yyyy')), parseInt(format(earliest, 'MM')), parseInt(format(earliest, 'dd')), classObj.xHour.time[0], classObj.xHour.time[1]] as DateArray,
              duration: { hours: classObj.xHour.time[2], minutes: classObj.xHour.time[3] },
              recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.xHour.days.join(',')};INTERVAL=1;UNTIL=${endDate}`
            });
          }
        }
        return events;
      } else return null
    };

    const events = generateEvents();
    if (events) {
      const file: Blob | MediaSource = await new Promise((resolve, reject) => {
        createEvents(
          events,
          (error, value) => {
            if (error) {
              reject(error);
            }

            resolve(new File([value], filename, { type: 'text/calendar' }));
          }
        );
      });
      const url = URL.createObjectURL(file);

      // trying to assign the file URL to a window could cause cross-site
      // issues so this is a workaround using HTML5
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(url);
    } else {
      // error handle failure to generate events
    }
  }

  const getTerm = () => {
    if (term) {
      const date = new Date();
      const acronyms = {
        summer: 'X',
        fall: 'F',
        winter: 'W',
        spring: 'S',
      }
      const termCode = (date.getFullYear() % 100) + acronyms[term as keyof ICalendarYear]
      return termCode
    }
  }

  return (
    <>
      {contextHolder}
      <Divider />

      <section className='step-1'>
        <h3>Step 1: Enter courses for {getTerm()}</h3>
        <CourseInput />
      </section>

      <Divider />

      <section className='step-2'>
        <h3>Step 2: View courses and download .ics file</h3>
        <CourseCards />
      </section>

      <Divider />

      <div id="download-container">
        <Checkbox checked={includeXHour} onChange={onChange}>
          Include X-hours
        </Checkbox>
        <div>
          <Button type="primary" onClick={() => handleDownload()}>Download calendar</Button>

          <NavLink to="/instructions" target="_blank">
            <Button type="link">How do I add a .ics file to my Google calendar?</Button>
          </NavLink>
        </div>



      </div>
    </>
  );
}

export default App;

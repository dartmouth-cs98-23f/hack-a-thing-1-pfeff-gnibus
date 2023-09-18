import CourseInput from './components/CourseInput';
import { DateArray, createEvents } from 'ics';
import './App.css';
import { useState, useEffect } from 'react';
import CourseCards from './components/CourseCards';
import { ICalendarYear, IClass } from './types.ts';
import { message, Button } from 'antd';
import fetchAcademicCalendar from './utils/fetchAcademicCalendar.ts';

function App() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [keyDates, setKeyDates] = useState<ICalendarYear | undefined>();
  const [term, setTerm] = useState<string | undefined>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    async function fetchDates() {
      try {
        const dates = await fetchAcademicCalendar(2023);
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
          const termCode = (date.getFullYear() % 100) + acronyms[term]
          setTerm(term)
        }
      });
    }
  }, [keyDates]);


  const addSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Added course to calendar!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'You\'ve already added this course!',
    });
  };

  const removeSuccess = () => {
    messageApi.info('Removed course from calendar!');
  };

  function addClass(newClass: IClass) {
    if (classes.some((cls) => cls.classTitle === newClass.classTitle)) {
      error();
      return;
    }
    setClasses((prevClasses) => [...prevClasses, newClass]);
    addSuccess();
  }

  function deleteClass(oldClass: IClass) {
    setClasses((prevClasses) =>
      prevClasses.filter((cls) => cls !== oldClass)
    );
    removeSuccess();
  }

  const [year, setYear] = useState('')


  async function handleDownload() {
    const filename = 'course_calendar.ics';

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

          // possible issues - calcualte first occurance of day in the first week as one thing. figure out how to make sure it is on or after; also, the recurrence rule until is not inclusive for end dates
          events.push({
            title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
            description: `${classObj.instructor} ${classObj.location}`,
            start: [startYear, startMonth, startDay, classObj.main?.time[0], classObj.main?.time[1]] as DateArray,
            duration: { hours: classObj.main?.time[2], minutes: classObj.main?.time[3] },
            recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.main?.days.join(',')};INTERVAL=1;UNTIL=${endDate}`
          });

          // adding x hour if option selected
          if (classObj.xHour) {
            events.push({
              title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle} X-Hour`,
              description: `${classObj.instructor} ${classObj.location} X-Hour`,
              start: [startYear, startMonth, startDay, classObj.xHour.time[0], classObj.xHour.time[1]] as DateArray,
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



  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={() => handleDownload()}>Download calendar</Button>
      <CourseInput addCourseToState={addClass} />
      <CourseCards courses={classes} deleteCourse={deleteClass} />
    </div >
  );
}

export default App;

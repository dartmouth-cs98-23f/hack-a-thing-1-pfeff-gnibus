import CourseInput from './components/CourseInput';
import { DateArray, createEvents } from 'ics';
import './index.css';
import { useState } from 'react';
import CourseCards from './components/CourseCards';
import { IClass } from './types.ts';
import { message, Button, Divider} from 'antd';

function App() {
  const [classes, setClasses] = useState<IClass[]>([
  ])


  const [messageApi, contextHolder] = message.useMessage();

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
    messageApi.open({
      type: 'success',
      content: 'Removed course from calendar!',
    });
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

  // const [year, setYear] = useState('')



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
      const events = [];
      for (const classObj of classes) {
        const date = new Date();
        // const starter = [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main?.time[0], classObj.main?.time[1]] as DateArray;
        events.push({
          title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
          // description: `${classObj.instructor} ${classObj.location}`,
          location: classObj.location,
          start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main?.time[0], classObj.main?.time[1]] as DateArray,
          duration: { hours: classObj.main?.time[2], minutes: classObj.main?.time[3] },
          recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.main?.days.join(',')};INTERVAL=1;COUNT=10`
        });

        if (classObj.xHour) {

          events.push({
            title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle} X-Hour`,
            // description: `${classObj.instructor} ${classObj.location} X-Hour`,
            location: classObj.location,
            start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.xHour.time[0], classObj.xHour.time[1]] as DateArray,
            duration: { hours: classObj.xHour.time[2], minutes: classObj.xHour.time[3] },
            recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.xHour.days.join(',')};INTERVAL=1;COUNT=10`
          });
        }
      }
      return events;
    };

    const events = generateEvents();

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
  }



  return (
    <>
      {contextHolder}
      <header className='header'>
        <h1>Calendarize</h1>
        <p className='header-subtext'>Calendar generator for Dartmouth students</p>
      </header>

      <Divider />

      <section className='step-1'>
        <h3>Step 1: Enter courses</h3>
        <CourseInput addCourseToState={addClass} />
      </section>

      <Divider />

      <section className='step-2'>
        <h3>Step 2: View courses and download calendar invite</h3>
        <CourseCards courses={classes} deleteCourse={deleteClass} />
      </section>

      <Divider />

      <Button type="primary" onClick={() => handleDownload()}>Download calendar</Button>
    </>
  );
}

export default App;

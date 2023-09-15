import CourseInput from './components/CourseInput';
import { DateArray, EventAttributes, createEvents } from 'ics';
import './App.css';
import { useState, useEffect } from 'react';
import CourseCards from './components/CourseCards';
import { IClass } from './types.ts';
import { message } from 'antd';

function App() {
  const [classes, setClasses] = useState<IClass[]>([
  ])


  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
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

  function addClass(newClass: IClass) {
    if (classes.some((cls) => cls.classTitle === newClass.classTitle)) {
      error();
      return;
    }
    success();
    setClasses((prevClasses) => [...prevClasses, newClass]);
  }

  function deleteClass(oldClass: IClass) {
    setClasses((prevClasses) =>
      prevClasses.filter((cls) => cls !== oldClass)
    );
  }

  const [year, setYear] = useState('')



  async function handleDownload() {
    const filename = 'ExampleEvent.ics';

    const generateEvents = () => {
      const events = [];
      for (const classObj of classes) {
        const date = new Date();
        /* const event = {
          title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
          description: `${classObj.instructor} ${classObj.building} ${classObj.roomNumber}`,
          start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main.time[0], classObj.main.time[1]],
          duration: { hours: classObj.main.time[3], minutes: classObj.main.time[2] },
          recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.main.days.join(',')};INTERVAL=1;COUNT=10`
        } */
        const starter = [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main?.time[0], classObj.main?.time[1]] as DateArray;
        events.push({
          title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
          description: `${classObj.instructor} ${classObj.location}`,
          start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main?.time[0], classObj.main?.time[1]] as DateArray,
          duration: { hours: classObj.main?.time[2], minutes: classObj.main?.time[3] },
          recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.main?.days.join(',')};INTERVAL=1;COUNT=10`
        });

        // adding x hour if option selected
        if (classObj.xHour) {
          /* const xHourEvent = {
            title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle} X-Hour`,
            description: `${classObj.instructor} ${classObj.building} ${classObj.roomNumber} X-Hour`,
            start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.xHour.time[0], classObj.xHour.time[1]],
            duration: { hours: classObj.xHour.time[3], minutes: classObj.xHour.time[2] },
            recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.xHour.days.join(',')};INTERVAL=1;COUNT=10`
          } */
          events.push({
            title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle} X-Hour`,
            description: `${classObj.instructor} ${classObj.location} X-Hour`,
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
    <div>
      {contextHolder}
      <button type="button" onClick={() => handleDownload()}>
        download
      </button>
      <CourseInput addCourseToState={addClass} />
      <CourseCards courses={classes} deleteCourse={deleteClass} />
    </div >
  );
}

export default App;

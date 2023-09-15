import CourseInput from './components/CourseInput';
import { DateArray, EventAttributes, createEvents } from 'ics';
import './App.css';
import { useState, useEffect } from 'react';

import { IClass } from './types.ts';

function App() {

  const [classes, setClasses] = useState<IClass[]>([
    {
      subjectCode: 'COSC',
      courseNum: '30',
      classTitle: 'Test Class 1 (2A)',
      instructor: 'Ligmaballs',
      periodCode: '2A',
      building: 'ECSC',
      roomNumber: '069',
      main: {
        time: [14, 25, 1, 50],
        days: ['TU', 'TH'],
      },
      xHour: {
        time: [17, 30, 0, 50],
        days: ['WE'],
      }
    },
    {
      subjectCode: 'PHIL',
      courseNum: '1.01',
      classTitle: 'Test Class 2 (10)',
      instructor: 'Balls ack',
      periodCode: '10',
      building: 'Dartmouth Hall',
      roomNumber: '180',
      main: {
        time: [10, 10, 1, 5],
        days: ['MO', 'WE', 'FR'],
      },
      xHour: {
        time: [12, 15, 0, 50],
        days: ['TH'],
      }
    },
  ])

  const [year, setYear] = useState('')



  async function handleDownload() {
    const filename = 'ExampleEvent.ics';

    const generateEvents = () => {
      const events = [];
      for (const classObj of classes) {
        console.log(classObj.subjectCode)
        const date = new Date();
        /* const event = {
          title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
          description: `${classObj.instructor} ${classObj.building} ${classObj.roomNumber}`,
          start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main.time[0], classObj.main.time[1]],
          duration: { hours: classObj.main.time[3], minutes: classObj.main.time[2] },
          recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.main.days.join(',')};INTERVAL=1;COUNT=10`
        } */
        const starter = [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.main?.time[0], classObj.main?.time[1]] as DateArray;
        console.log('STARTER HERE', starter);
        events.push({
          title: `${classObj.subjectCode.trim()} ${classObj.courseNum.trim()}: ${classObj.classTitle}`,
          description: `${classObj.instructor} ${classObj.building} ${classObj.roomNumber}`,
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
            description: `${classObj.instructor} ${classObj.building} ${classObj.roomNumber} X-Hour`,
            start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), classObj.xHour.time[0], classObj.xHour.time[1]] as DateArray,
            duration: { hours: classObj.xHour.time[2], minutes: classObj.xHour.time[3] },
            recurrenceRule: `FREQ=WEEKLY;BYDAY=${classObj.xHour.days.join(',')};INTERVAL=1;COUNT=10`
          });
        }
      }
      return events;
    };

    const events = generateEvents();
    console.log('events here', events);

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
      <button type="button" onClick={() => handleDownload()}>
        download
      </button>
      <CourseInput />
    </div >
  );
}

export default App;

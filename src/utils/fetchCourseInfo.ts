import axios from 'axios';
import { IClass, Period } from '../types';
import courseSchedule from '../constants/courseSchedule';

export default async function fetchCourseInfo(subj: string, crsenum: string): Promise<IClass[]> {
  // https://github.com/Freeboard/thingproxy
  const url = 'https://corsproxy.io/?https://oracle-www.dartmouth.edu/dart/groucho/timetable.course_quicksearch';
  const data = new URLSearchParams();
  data.append('subj', subj);
  data.append('crsenum', crsenum);
  data.append('classyear', '2008');

  try {
    const response = await axios.post(url, data);
    const htmlString = response.data;

    // used chatGPT to parse html
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const dataTableDiv = doc.querySelector('.data-table');

    if (!dataTableDiv) {
      throw new Error('No courses found.');
    }

    let titleDiv, periodCodeDiv, buildingDiv, roomDiv, instructorDiv;

    const rows = dataTableDiv.querySelectorAll('table tr');

    const results:IClass[] = []

    const seenPeriodCodes = new Set();

    for (const row of rows) {
      const cells = row.querySelectorAll('td');

      if (cells.length >= 18) {
        titleDiv = cells[5];
        periodCodeDiv = cells[8];
        roomDiv = cells[10];
        buildingDiv = cells[11];
        instructorDiv = cells[12];

        const periodCode = periodCodeDiv?.textContent?.trim() || '';
        if (seenPeriodCodes.has(periodCode)) {
          continue;
        }

        const building = buildingDiv?.textContent?.trim() || '';
        const room = roomDiv?.textContent?.trim() || '';
        const location = `${building} ${room}`;

        const main: Period = courseSchedule[periodCode].class;
        const xHour: Period = courseSchedule[periodCode].xHour;

        const course = {
          subjectCode: subj,
          courseNum: crsenum,
          classTitle: titleDiv?.textContent?.trim() || '',
          instructor: instructorDiv?.textContent?.trim() || '',
          periodCode: periodCodeDiv?.textContent?.trim() || '',
          location: location,
          main: main,
          xHour: xHour,
        };
      
        results.push(course);
        seenPeriodCodes.add(periodCode);
      }
    }

    console.log(results);
    return results;

  } catch (error) {
    throw new Error(`${error}`);
  }
}

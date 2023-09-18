import axios from 'axios';
import { ICalendarYear } from '../types';

export default async function fetchAcademicCalendar(): Promise<ICalendarYear> {

  const date = new Date();
  let currYear = date.getFullYear() % 100;

  let yearCode = ''
  if ((date.getMonth() === 7 && date.getDate() > 16) || date.getMonth() > 7) { // could maybe do something else for this but checks if after rough gradutation date
    yearCode = `${currYear}_${currYear + 1}`
  } else {
    yearCode = `${currYear - 1}_${currYear}`
  }


  //const url = 'http://localhost:3000/fetchAcademicCalendar';
  const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://www.dartmouth.edu/reg/calendar/academic/${yearCode}.html`);

  //const data = new URLSearchParams();

  try {
    //const response = await axios.post(url, data);
    const response = await axios.get(url);
    const htmlString = response.data;

    // used chatGPT to parse html
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const termElements = doc.querySelectorAll('div.b6 ul[type="disc"] li');

    if (termElements.length === 0) {
      throw new Error('Error selecting date elements');
    }

    const terms = ['Summer', 'Fall', 'Winter', 'Spring']
    const dates: ICalendarYear = {
      summer: [new Date(), new Date()],
      fall: [new Date(), new Date()],
      winter: [new Date(), new Date()],
      spring: [new Date(), new Date()],
    }

    termElements.forEach((element) => {
      const text = element.textContent;
      terms.forEach((term) => {
        if (text?.includes(`${term} term classes begin`)) {
          const startDateMatch = text.split(' -- ');
          if (startDateMatch) {
            dates[term.toLocaleLowerCase() as keyof ICalendarYear][0] = new Date(startDateMatch[0]);
          } else {
            throw new Error(`Error parsing start date for ${term}`)
          }
        } else if (text?.includes(`${term} term classes end`)) {
          const endDateMatch = text.split(' -- ');
          if (endDateMatch) {
            dates[term.toLocaleLowerCase() as keyof ICalendarYear][1] = new Date(endDateMatch[0]);
          } else {
            throw new Error(`Error parsing end date for ${term}`)
          }
        }
      });
    });
    return dates;

  } catch (error) {
    throw new Error(`Error building calendar: ${error}`);
  }
}

import axios from 'axios';
import courseSchedule from '../constants/courseSchedule';

export default async function fetchPeriodCodes(subj: string, crsenum: string): Promise<string[]> {

  const url = 'http://localhost:3000/fetchPeriodCodesProxy'; // Updated URL to use your server-side proxy route
  const data = new URLSearchParams();
  data.append('subj', subj);
  data.append('crsenum', crsenum);
  data.append('classyear', '2008');

  try {
    const response = await axios.post(url, data);
    const htmlString = response.data;

    // used chatGPT to help parse the html
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const periodCodeElements = doc.querySelectorAll('a[href^="https://www.dartmouth.edu/reg/docs/class_schedule_22f.pdf"]');

    const periodCodes: string[] = [];

    periodCodeElements.forEach(element => {
      const periodCode = element.textContent?.trim() || '';
      if (Object.keys(courseSchedule).includes(periodCode) && !periodCodes.includes(periodCode)) {
        periodCodes.push(periodCode);
      }
    });

    return periodCodes;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

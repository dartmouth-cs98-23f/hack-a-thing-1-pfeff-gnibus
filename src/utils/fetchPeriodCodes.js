import axios from 'axios';
import cheerio from 'cheerio';
import courseSchedule from '../constants/courseSchedule';

export default async function fetchPeriodCodes(subj, crsenum) {
  const url = 'http://localhost:3000/fetchPeriodCodesProxy'; // Updated URL to use your server-side proxy route
  const data = new URLSearchParams();
  data.append('subj', subj);
  data.append('crsenum', crsenum);
  data.append('classyear', '2008');

  try {
    const response = await axios.post(url, data);
    const htmlString = response.data;

    // chatGPT helped with this HTML parsing
    const $ = cheerio.load(htmlString);
    const periodCodeElements = $(
      'a[href^="https://www.dartmouth.edu/reg/docs/class_schedule_22f.pdf"]'
    );

    const periodCodes = [];

    periodCodeElements.each((index, element) => {
      const periodCode = $(element).text();
      if (Object.keys(courseSchedule).includes(periodCode)) {
        periodCodes.push(periodCode);
      }
    });

    return periodCodes;
  } catch (error) {
    throw new Error('Error:', error);
  }
}

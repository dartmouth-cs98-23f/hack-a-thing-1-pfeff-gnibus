import axios from 'axios';
import cheerio from 'cheerio';

export default async function fetchPeriodCodes(subj, crsenum) {
  const url = 'http://localhost:3000/fetchPeriodCodesProxy'; // Updated URL to use your server-side proxy route
  const data = new URLSearchParams();
  data.append('subj', subj);
  data.append('crsenum', crsenum);
  data.append('classyear', '2008');

  const codes = [
    '8S',
    '8L',
    '9S',
    '9L',
    '10',
    '11',
    '12',
    '2',
    '10A',
    '11A',
    '2A',
    '3A',
    '6B',
  ];

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
      if (codes.includes(periodCode)) {
        periodCodes.push(periodCode);
      }
    });

    return periodCodes;
  } catch (error) {
    throw new Error('Error:', error);
  }
}

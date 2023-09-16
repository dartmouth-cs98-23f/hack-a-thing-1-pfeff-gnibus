import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

// host this separately from the client-side code at some point
// made server-side proxy route to avoid CORS issues

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/fetchPeriodCodesProxy', async (req, res) => {
  try {
    // used this header becayse the request was failing with the default headers, got from Postman
    const headers = {
      'Content-Type':
        'multipart/form-data; boundary=--------------------------374316506716627533073844',
    };
    const config = {
      headers,
    };

    const response = await axios.post(
      'https://oracle-www.dartmouth.edu/dart/groucho/timetable.course_quicksearch',
      req.body,
      config
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const fetchNumbers = require('./services/fetchNumbers');
const calculateAverage = require('./utils/calculateAverage');


const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let storedNumbers = [];

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  const validTypes = ['p', 'f', 'e', 'l'];

  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const numbers = await fetchNumbers(type);

  // Ensure stored numbers are unique
  storedNumbers = [...new Set([...storedNumbers, ...numbers])];

  // Limit stored numbers to the window size
  if (storedNumbers.length > WINDOW_SIZE) {
    storedNumbers = storedNumbers.slice(-WINDOW_SIZE);
  }

  const avg = calculateAverage(storedNumbers);

  res.json({
    windowPrevState: storedNumbers.slice(0, -numbers.length),
    windowCurrState: storedNumbers,
    numbers,
    avg,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

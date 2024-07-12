const axios = require('axios');

const API_URLS = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  l: 'http://20.244.56.144/test/rand',
};

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(API_URLS[type], { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return [];
  }
};

module.exports = fetchNumbers;

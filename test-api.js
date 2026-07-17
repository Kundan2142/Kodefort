
const fetch = require('node-fetch');

async function test() {
  try {
    const response = await fetch('http://localhost:3000/api/internship/enroll/6');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    const text = await response.text();
    console.log('Response Text:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();

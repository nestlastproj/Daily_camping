import axios from 'axios';
const https = require('https');

function asd() {
  const agent = new https.Agent({ rejectUnauthorized: false });
  axios
    .get('https://place.map.kakao.com/14061000', {
      httpsAgent: agent, // Use httpsAgent instead of hpppsAgent
      headers: {
        // Set any additional headers here
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

asd();

// import { Curl } from 'node-libcurl';

// function a() {
//   const curl = new Curl();

//   curl.setOpt('URL', 'https://place.map.kakao.com/main/v/14061000');
//   curl.setOpt('FOLLOWLOCATION', true);

//   curl.on('end', function (statusCode, data, headers) {
//     const result = JSON.parse(data.toString());
//     console.log(result);
//     this.close();
//   });

//   curl.on('error', curl.close.bind(curl));
//   curl.perform();
// }

// a()

// import { Curl } from 'node-libcurl';

// function a() {
//   return new Promise((resolve, reject) => {
//     const curl = new Curl();

//     curl.setOpt('URL', 'https://place.map.kakao.com/main/v/14061000');
//     curl.setOpt('FOLLOWLOCATION', true);

//     curl.on('end', function (statusCode, data, headers) {
//       const result = JSON.parse(data.toString());
//       resolve(result);
//       this.close();
//     });

//     curl.on('error', (error) => {
//       reject(error);
//       curl.close();
//     });

//     curl.perform();
//   });
// }

// a().then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.error(error);
// });

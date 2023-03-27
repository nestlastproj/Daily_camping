const { Curl } = require('node-libcurl');

console.log(111111111);

const curl = new Curl();

curl.setOpt('URL', 'https://place.map.kakao.com/main/v/14061000');
curl.setOpt('FOLLOWLOCATION', true);
curl.setOpt('SSLVERSION', 0);
curl.setOpt('SSL_OPTIONS', 1 << 5);

curl.on('end', function (statusCode, data, headers) {
  console.log(222222222222);
  const result = JSON.parse(data);
  console.log(result.photo.photoList[0].list[0].orgurl);
  this.close();
});

curl.on('error', (err) => {
  curl.close.bind(curl);
  console.log(err, 3333333333);
});
curl.perform();

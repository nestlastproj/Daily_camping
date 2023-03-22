$(document).ready(function () {
  waetherData();
});

function waetherData() {
  axios({
    url: '/waether/weatherfind',
    method: 'GET',
  }).then((res) => {
    console.log(res);
    document.getElementById('imagediv').innerHTML = '';
    res.data.forEach((data) => {
      if (data.address === '백령도') {
        let temp_html = `
        <div class="weathericon" style="background-image: url('../public/weathericon/sun.png');"></div>
        <div class="weatheraddress">백령도 23.2˚</div>
          `;
      }
    });
  });
}

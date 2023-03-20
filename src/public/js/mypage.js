$(document).ready(function () {
  axios({
    method: 'get',
    url: '/auth/me',
  })
    .then((res) => {
      console.log(res);
      let { image } = res.data;
      document.getElementById('image2').src = `/uploads/${image}`;
      let temp_html = `
            <h1>
            <div id="nickname" 이름(닉네임)>
                <h1 class="profile-user-name">닉네임: ${res.data.nickname}</h1>
            </div>
            </h1>
            <h3 id="phone">전화번호: ${res.data.phone}</h3>
            <h4 id="email">이메일: ${res.data.email}</h4>
            `;
      $('.profileinfo').append(temp_html);
    })
    .catch((err) => {
      console.log(err, 'err');
    });
});

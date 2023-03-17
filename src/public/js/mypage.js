$(document).ready(function () {
    axios({
        method: 'get',
        url: '/auth/mypage/get'
    })
        .then((res) => {
            let { image } = res.data
            document.getElementById('image2').src = `/uploads/${image}`
            let temp = `<h1 class="profile-user-name">${res.data.nickname}</h1>`
            $('#nickname').append(temp);
        })
        .catch((err) => {
            console.log(err, 'err')
        })
});

$(document).ready(function () {
    axios({
        method: 'get',
        url: '/auth/mypage/get',
    })
        .then((res) => {
            let { email, name, nickname, phone, image } = res.data
            document.getElementById('email').value = `${email}`
            document.getElementById('name').value = `${name}`
            document.getElementById('nickname').value = `${nickname}`
            document.getElementById('phone').value = `${phone}`
            document.getElementById('image2').src = `/uploads/${image}`
        })
        .catch((err) => {
            console.log(err, 'err')
        })
})
function updateprofile() {
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let nickname = document.getElementById('nickname').value
    let phone = document.getElementById('phone').value
    let image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('phone', phone);
    formData.append('file', image);

    axios.put(`/auth/edit`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => {
            alert('수정 완료! 다시 로그인 해주세요!');
            console.log(res);
            window.location.replace(`/auth/login`);
        })
        .catch((err) => {
            console.log('error', err);
        })
}
$(document).ready(function () {
    axios({
        method: 'get',
        url: '/auth/mypage/get',
    })
        .then((res) => {
            console.log(res.data)
            let { email, name, nickname, phone, image } = res.data
            document.getElementById('email').value = `${email}`
            document.getElementById('name').value = `${name}`
            document.getElementById('nickname').value = `${nickname}`
            document.getElementById('phone').value = `${phone}`
            const aa = document.getElementById('image2').src = `/uploads/${image}`
            // let temp = `<img data-src="/uploads/${image}" class="img-thumbnail img-fluid">`
            // $('#image2').append(temp)
            console.log(aa, 'aa')
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
    console.log(image, 'image')
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
            alert('수정 완료!');
            console.log(res);
            // window.location.replace(``);
        })
        .catch((err) => {
            console.log('error', err);
        })
}
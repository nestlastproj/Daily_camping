$(document).ready(function () {
    const id = document.getElementsByClassName('container')[0].id;
    $.ajax({
        type: 'GET',
        url: `/auth/mypage/${id}`,
        data: {},
        success: function (response) {
            let { email, name, nickname, phone } = response
            document.getElementById('email').value = `${email}`
            document.getElementById('name').value = `${name}`
            document.getElementById('nickname').value = `${nickname}`
            document.getElementById('phone').value = `${phone}`
            // document.getElementById('image').value = `${image}`
        }
    })
})

const id = document.getElementsByClassName('container')[0].id;
function updateprofile() {
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let nickname = document.getElementById('nickname').value
    let phone = document.getElementById('phone').value
    $.ajax({
        type: 'PUT',
        url: `/auth/edit/${id}`,
        data: { email, name, nickname, phone },
        success: function (success) {
            alert('수정 완료!');
        },
        error: function (error) {
            alert('수정 실패')
        },
    });
}
$(document).ready(function () {
    axios.get('/auth/isLoggined').then((res) => {
        let temp = `<p><a href="/auth/mypage">${res.data.nickname}</a>님 <br>반갑습니다.</p>
                    <button onclick="logout()" class="button-arounder">로그아웃</button>`
        $('.buttons-container').append(temp)

    }).catch((err) => {
        let temp = `<button onclick="location.href='/auth/login'" class="button-arounder">로그인</button>`
        $('.buttons-container').append(temp)
    })
})

function logout() {
    axios({
        method: "post",
        url: "/auth/logout",
    })
        .then((res) => {
            location.href = "/main";
        })
        .catch((error) => {
            alert('알 수 없는 에러가 발생했습니다');
            console.log(error)
        })
}

function loginUser() {
    axios.get('/auth/isLoggined').then((res) => {
        location.href = '/article/list'
    }).catch((err) => {
        alert('로그인 후 이용 가능 합니다.')
        location.href = '/auth/login'
    })
}
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
            console.log('11111111')
            location.href = "/main";
        })
        .catch((error) => {
            console.log('222222222')
            alert('알 수 없는 에러가 발생했습니다');
            console.log(error)
        })
}
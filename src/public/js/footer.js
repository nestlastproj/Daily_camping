$(document).ready(function () {
    axios.get('/auth/isLoggined').then((res) => {
        let temp = `<a href="/auth/mypage">Mypage</a>`
        $('.mypage').append(temp)
    })
        .catch((err) => {
            let temp = `<a href="/auth/login">Mypage</a>`
            $('.mypage').append(temp)
        })
})
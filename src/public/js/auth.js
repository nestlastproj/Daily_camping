function login() {
    console.log('로그인 함수 시작')
    const email = $('#login_email').val();
    const password = $('#login_password').val();

    if (!email || !password) {
        alert('닉네임 또는 비밀번호가 입력되지 않았습니다.');
    } else {
        console.log('제발 들어가라')
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: {
                email,
                password,
            },
            success: function (success) {
                console.log('로그인 성공 맞음?')
                alert(`로그인 성공, 환영합니다 ${email}님`);
                // token = response.token;
                location.href = 'http://localhost:3000';
            },
            error: function (error) {
                alert('로그인 실패..............');
                console.log('에러이유:', error);
            },
        });
    }
}

function signup() {
    const name = $("#name").val();
    const password = $("#password").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const nickname = $("#nickname").val();
    const re_email = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/;

    if (!name || !email || !password || !phone || !nickname) {
        alert("빈칸 없이 채워주세요.");
    } if (email.search(re_email) === -1) {
        alert('email 형식이 일치하지 않습니다');
    } else {
        $.ajax({
            type: "post",
            url: "/auth/signup",
            data: {
                name,
                email,
                password,
                phone,
                nickname
            },
            success: function (response) {
                alert(`${email}님 회원가입이 완료되었습니다`);
                location.href = "/auth/login";
            },
            error: function (error) {
                alert("회원가입 실패");
                console.log("에러이유:", error);
            },
        });
    }
}

function logout() {
    $.ajax({
        type: "post",
        url: "/auth/logout",
        data: {},
        success: function (response) {
            location.href = "http://localhost:3000";
        },
        error: function (error) {
            console.log("에러이유:", error);
        },
    });
}
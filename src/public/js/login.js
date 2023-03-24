// let container = document.getElementById("container");

toggle = () => {
    container.classList.toggle("sign-in");
    container.classList.toggle("sign-up");
};

setTimeout(() => {
    container.classList.add("sign-in");
}, 200);



function login() {
    const email = $('#login_email').val();
    const password = $('#login_password').val();

    if (!email || !password) {
        alert('닉네임 또는 비밀번호가 입력되지 않았습니다.');
    } else {
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: {
                email,
                password,
            },
            success: function (success) {
                alert(`로그인 성공, 환영합니다 ${email}님`);
                location.href = '/main';
            },
            error: function (error) {
                alert('로그인 실패');
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
    const re_nickname = /^([a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣][a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/
    const re_name = /^([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/

    if (!name || !email || !password || !phone || !nickname) {
        alert("빈칸 없이 채워주세요.");
    } if (email.search(re_email) === -1) {
        alert('email 형식이 일치하지 않습니다');
    } else if (nickname.search(re_nickname) === -1) {
        alert('닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 가능합니다.')
    } else if (name.search(re_name) === -1) {
        alert('이름을 올바르게 기재해주세요.')
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
                alert(error.responseJSON.message);
            },
        });
    }
}
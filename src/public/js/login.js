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
                alert('비밀번호가 올바르지 않거나 회원이 아닙니다.');
            },
        });
    }
}

function signup() {
    const name = $("#name").val();
    const password = $("#password").val();
    const email = $("#email").val();
    const emailcheck = $("#emailCheck").val();
    const phone = $("#phone").val();
    const nickname = $("#nickname").val();
    const re_email = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/;
    const re_nickname = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
    const re_name = /^([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/

    let authNum;
    let checkNum;

    if (document.cookie.includes('authNum')) {
        authNum = document.cookie.split('authNum=')[1];
    } else {
        alert('인증을 완료해주세요.')
    }

    if (emailcheck === authNum) {
        checkNum = true;
    }

    if (!name || !email || !password || !phone || !nickname) {
        alert("빈칸 없이 작성해주세요.");
    } else if (!emailcheck) {
        alert('email 인증을 진행해주세요.');
    } else if (!checkNum) {
        alert('email 인증에 실패하였습니다.');
    } else if (email.search(re_email) === -1) {
        alert('email 형식이 일치하지 않습니다.');
    } else if (nickname.search(re_nickname) === -1) {
        alert('닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성 가능합니다.')
    } else if (name.search(re_name) === -1) {
        alert('이름은 2자 이상 10자 이하, 한글만 기재해주세요.')
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
                window.location.reload();
            },
        });
    }
}


function emailSend() {
    const emailval = $("#email").val();
    axios({
        method: 'post',
        url: '/auth/emailSend',
        data: { emailval }
    })
        .then((res) => {
            alert('전송 완료')
        })
        .catch((err) => {
            alert(err.response.data.message);
            console.log(err)
        })
}

function emailValidate() {
    const emailcheck = $("#emailCheck").val();
    let authNum;
    let checkNum;

    if (document.cookie.includes('authNum')) {
        authNum = document.cookie.split('authNum=')[1];
    } else {
        return alert('인증번호가 없습니다.')
    }
    if (emailcheck === authNum) {
        checkNum = true;
        return alert('인증이 완료되었습니다.')
    } else {
        alert('인증번호가 틀렸습니다.')
    }
}
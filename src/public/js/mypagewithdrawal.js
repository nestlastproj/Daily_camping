// import bcrypt from 'bcryptjs';
const bcrypt = window.bcrypt;

function userValidate() {
    debugger
    axios({
        method: 'get',
        url: '/auth/userValidate'
    })
        .then((res) => {
            debugger
            console.log(res.data, 'res')
            const password = prompt('비밀번호를 입력하세요.');
            bcrypt.compare(password, res.data, function (result) {
                if (result === true) {
                    alert('환영합니다!');
                } else {
                    alert('비밀번호가 올바르지 않습니다.');
                    window.location.href = '/auth/mypage';
                }
            });
        })
        .catch(error => {
            console.error(error);
        });

}

function deleteuser() {
    axios({
        method: 'delete',
        url: '/auth/logOff'
    })
        .then(() => {
            alert('회원 탈퇴 성공!')
            window.location.href = '/main';
        })
        .catch((err) => {
            console.log(err);
        });
}
function userValidate() {
    const passwordval = prompt('비밀번호를 입력하세요.');
    axios({
        method: 'post',
        url: '/auth/userValidate',
        data: { passwordval }
    })
        .then((res) => {
            if (res.data === true) {
                deleteuser()
            } else {
                alert('비밀번호가 올바르지 않습니다.')
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error);
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
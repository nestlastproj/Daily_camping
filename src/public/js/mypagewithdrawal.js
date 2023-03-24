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
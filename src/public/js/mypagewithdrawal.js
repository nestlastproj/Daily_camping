function deleteuser() {
    axios({
        method: 'delete',
        url: '/user/logoff'
    })
        .then((res) => {
            console.log(res);
            confirm('정말 탈퇴하시겠습니까?');
            window.location.href = '/auth/login';
        })
        .catch((err) => {
            console.log(err);
        });
}

/* const articleIdUrl = window.location.pathname;
const articleId = articleIdUrl.split('/')[3];
axios({
    method: 'delete',
    url: `/article/delete/${articleId}`,
})
    .then((res) => {
        console.log(res);
        confirm('삭제하시겠습니까?');
        window.location.href = '/article/list';
    })
    .catch((err) => {
        console.log(err);
    }); */
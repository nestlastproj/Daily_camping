$(document).ready(function () {
    const articleIdUrl = window.location.pathname;
    const articleId = articleIdUrl.split('/')[3];
    getmyprofiledata(articleId);
});

function getmyprofiledata(articleId) {
    axios({
        method: 'get',
        url: `/article/${articleId}`,
    })
        .then((res) => {
            let { title, content, createdAt, image } = res.data;

            let temp = `<div class="title" id="title">${title}</div>
                            <div class="info">
                                <dl>
                                    <dt>작성일</dt>
                                    <dd>
                                    <div id="createdAt">${createdAt}</div>
                                    </dd>
                                </dl>
                            </div>
                        <div class="profile-image">
                            <img src="/../uploads/${image}" id="image">
                        </div>
                        <div id="content">${content}</div>`;
            $('.boardView').append(temp);
        })
        // <dl>
        //     <dt>조회</dt>
        //     <dd>카운트</dd>
        // </dl>
        .catch((err) => {
            console.log(err, 'err');
        });
}

function deleteArticle() {
    const articleIdUrl = window.location.pathname;
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
        });
}

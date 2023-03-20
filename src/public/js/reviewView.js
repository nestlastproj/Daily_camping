$(document).ready(function () {
    const reviewIdUrl = window.location.pathname;
    const reviewId = reviewIdUrl.split('/')[3];
    getReviews(1);
});

function getReviews(reviewId) {
    axios({
        method: 'get',
        url: `/review/reviews/${reviewId}`,
    })
        .then((res) => {
            let { title, content, createdAt, image, user } = res.data;
            console.log(res.data)
            let data = res.data;

            data.forEach((data) => {
                const createdTime = new Date(data.createdAt);
                const year = createdTime.getFullYear();
                const month = createdTime.getMonth() + 1;
                const day = createdTime.getDate();
                let hour = createdTime.getHours();
                let minute = createdTime.getMinutes();
                if (hour.toString().length === 1) {
                    hour = '0' + hour.toString();
                }
                if (minute.toString().length === 1) {
                    minute = '0' + minute.toString();
                }
                let temp = `<div class="title">${data.title}</div>
                <div class="info">
                    <dl>
                        <dt>글쓴이</dt>
                        <dd>${data.user.nickname}</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</dd>
                    </dl>
                </div>
                <div class="profile-image">
                    <img src="../uploads/${data.image}">
                </div>
                <div id="content">${data.content}</div>`
                $('.boardView').append(temp);
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

function deleteReview() {
    axios({
        url: `/review/review/${reviewId}`,
        method: 'delete',
    })
        .then((res) => {
            confirm('삭제하시겠습니까?');
            window.location.href = '/place/placelist';
        })
        .catch((err) => {
            console.log(err);
        });
}

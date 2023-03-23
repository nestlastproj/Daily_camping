$(document).ready(function () {
    const reviewId = new URLSearchParams(location.search).get('reviewId');
    getReviews(reviewId);
});

function getReviews(reviewId) {
    axios({
        method: 'get',
        url: `/review/detail?reviewId=${reviewId}`,
    })
        .then((res) => {
            let { id, title, content, createdAt, image, user } = res.data;
            let userId = user.id
            const createdTime = new Date(createdAt);
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
            if (image === null) {
                let temp = `<div class="title">${title}</div>
                <div class="info">
                    <dl>
                        <dt>글쓴이</dt>
                        <dd>${user.nickname}</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</dd>
                    </dl>
                </div>
                <div class="profile-image">
                </div>
                <div id="content">${content}</div>
                
                <div class="btWrap">
                    <div class="buttons2"></div>
                </div>`
                $('.boardView').append(temp);
            } else {
                let temp = `<div class="title">${title}</div>
                <div class="info">
                    <dl>
                        <dt>글쓴이</dt>
                        <dd>${user.nickname}</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</dd>
                    </dl>
                </div>
                <div class="profile-image">
                    <img src="https://dailycampingbucket.s3.ap-northeast-2.amazonaws.com/${image}">
                </div>
                <div id="content">${content}</div>
                
                <div class="btWrap">
                    <div class="buttons2"></div>
                </div>`
                $('.boardView').append(temp);
            }

            loginUser3(userId);
        })
        .catch((err) => {
            console.log(err)
        })
}

function loginUser3(userId) {
    const id = new URLSearchParams(location.search).get('reviewId');
    axios.get(`/auth/isLoggined`)
        .then((res) => {
            if (userId == res.data.id) {
                let temp = `<a href="/review/edit?reviewId=${id}" class="on">수정</a>
                            <a onclick="deleteReview()" class="off">삭제</a>
                            <a href="/place/placelist" class="on">목록</a>`
                $('.buttons2').append(temp)
            }
            else {
                let temp = `<a href="/place/placelist" class="on">목록</a>`
                $('.buttons2').append(temp)
            }
        })
}

function deleteReview() {
    const reviewId = new URLSearchParams(location.search).get('reviewId');
    axios({
        url: `/review/review/${reviewId}`,
        method: 'delete',
    })
        .then((res) => {
            alert('삭제 완료!')
            window.location.href = '/place/placelist';
        })
        .catch((err) => {
            console.log(err);
        });
}

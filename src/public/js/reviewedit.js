$(document).ready(function () {
    const reviewIdUrl = window.location.pathname;
    const reviewId = reviewIdUrl.split('/')[3];
    myReviewEdit(1);
});

function myReviewEdit(reviewId) {
    let placeId = 1;
    axios({
        url: `/review/reviews/${placeId}`,
        method: 'GET',
    }).then((res) => {
        console.log(res.data)
        let { title, content, image } = res.data;
        let data = res.data;
        data.forEach((data) => {
            let temp_html = `
            <div class="title">
            <dl>
                <dt>제목</dt>
                <dd><input type="text" id="title" name="subject" class="form-control" value="${data.title}"></dd>
            </dl>
            </div>
            <div id="container">
                <textarea name="contents" id="content" class="form-control">${data.content}</textarea>
            </div>
            <div class="inputfield">
                <input type="file" id="image" name="file" class="input"/>
            </div>
            `;
            $('.boardWrite').append(temp_html);
        })

    });
}

function putMyReview() {
    const reviewIdUrl = window.location.pathname;
    // const reviewId = reviewIdUrl.split('/')[3];

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);
    let reviewId = 1;
    axios
        .put(`/review/review/${reviewId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            alert('수정 완료');
            location.href = '/place/placelist'
        });
}
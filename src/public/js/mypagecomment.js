$(document).ready(function () {
    const page = new URLSearchParams(location.search).get('page') || 1;
    mycommentData(page);
});

function mycommentData(page) {
    axios({
        url: `/comment/mycomment?page=${page}`,
        method: 'GET',
    }).then((res) => {
        const { meta, comments } = res.data;
        const { firstPage, lastPage, totalPage } = meta;

        comments.forEach((data) => {
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
            let temp_html = `
            <div class="list" onclick="location.href='/article/view/${data.articles.id}'">
              <div class="id">${data.id}</div>
              <div class="title">${data.content}</div>
              <div class="date">${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</div>
            </div>
            `;
            $('.boardList').append(temp_html);
        });

        const pages = [];

        // prev
        if (page > 1) {
            const prev = `<a class="page-link" href='?page=${Number(page) - 1}'>
            <span>&laquo;</span>
        </a>`;
            pages.push(prev);
        }

        // pages
        for (let i = firstPage; i <= lastPage; i++) {
            const pagesLink = `<a "page-link" href='?page=${i}'>${i}</a>`;
            pages.push(pagesLink);
        }

        // next
        if (page < totalPage) {
            const next = `<a class="page-link" href='?page=${Number(page) + 1}'>
            <span>&raquo;</span>
        </a>`;
            pages.push(next);
        }

        $('.pagination').append(pages.join(''));
    });
    // .catch((err) => {
    //   alert('댓글 내역 조회에 실패하였습니다.');
    //   window.location.href = '/';
    // });
}

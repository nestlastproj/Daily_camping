$(document).ready(function () {
    const page = new URLSearchParams(location.search).get('page') || 1;
    myReviewData(page);
});

function myReviewData(page) {
    axios({
        url: `/review/myReview?page=${page}`,
        method: 'GET',
    })
        .then((res) => {
            const { meta, reviews } = res.data;
            const { firstPage, lastPage, totalPage } = meta;

            reviews.forEach((data) => {
                let temp_html = `
                <div class="list" onclick="location.href=''">
                <div class="id">${data.id}</div>
                <div class="title">${data.title}</div>
                <div class="date">${data.createdAt}</div>
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
        })
    // .catch((err) => {
    //     alert('리뷰 정보 로드에 실패하였습니다.');
    //     window.location.href = '/';
    // });
}



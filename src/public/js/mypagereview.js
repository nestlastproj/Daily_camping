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
      let count = 0;
      reviews.forEach((data) => {
        count++;
        const createdTime = new Date(data.createdAt);
        const year = createdTime.getFullYear();
        const month = createdTime.getMonth() + 1;
        const day = createdTime.getDate();
        const hour = createdTime.getHours();
        const minute = createdTime.getMinutes();
        let temp_html = `
                <div class="list" onclick="location.href='/review/reviewView?reviewId=${data.id}'">
                <div class="id">${count}</div>
                <div class="title" style="cursor:pointer">${data.title}</div>
                <div class="date">${year}년 ${month}월 ${day}일  ${hour}시${minute}분</div>
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
        const pagesLink = `<a class="page-link-number" href='?page=${i}'>${i}</a>`;
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
      var links = document.querySelectorAll('.page-link-number');
      if (links.length !== 0 && page <= 5) {
        const now = page - 1;
        links[now].classList.add('active');
      } else if (page > 5) {
        const now = page % 5;
        if (now === 0) {
          links[4].classList.add('active');
        } else {
          links[now - 1].classList.add('active');
        }
      }
    })
    .catch((err) => {
      alert('리뷰 정보 로드에 실패하였습니다.');
      window.location.href = '/';
    });
}

$(document).ready(function () {
    const page = new URLSearchParams(location.search).get('page') || 1;
    getarticlelist(page);
});
function getarticlelist(page) {
    axios({
        method: 'get',
        url: `search?page=${page}`,
    })
        .then((response) => {
            const { data, meta } = response.data;
            const { firstPage, lastPage, totalPage } = meta;

            let count = 0;
            for (let i in data) {
                let articleId = data[i].id;
                let title = data[i].title;
                let createdAt = data[i].createdAt;
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
                let temp = `
                <div class="list">
                    <div class="id">${articleId}</div>
                    <div class="title"><a href='/article/view/${articleId}'>${title}</a></div>
                    <div class="date">${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</div>
                </div>
                `;
                $('.boardList').append(temp);
            }

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

}

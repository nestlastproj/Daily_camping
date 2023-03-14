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
                count++;
                let title = data[i].title;
                let content = data[i].content;
                let createdAt = data[i].createdAt;
                let temp = `
                <tr>
                    <td>${count}</td>
                    <td>${title}</td>
                    <td>${content}</td>
                    <td>${createdAt}</td>
                </tr>
                `;
                $('#articlelist').append(temp);
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

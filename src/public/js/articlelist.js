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
            const { data } = response.data;
            const { page, last } = response.data.meta;
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
            // total = 전체 데이터 개수
            // page = 현재 페이지 번호
            // last = 마지막 페이지 번호

            const pages = [];

            // 페이지 그룹의 첫번 째 페이지가 1보다 크면 이전 화살 만들기
            if (page > 1) {
                pages.push(`<li class="page-item">
                                <a class="page-link" href="?page=${page - 1
                    }" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>`);
            }
            // 페이지 그룹의 마지막 페이지까지 페이지 숫자 렌더링 하기
            for (let i = 1; i <= last; i++) {
                pages.push(`<li class="page-item"><a class="page-link" href='?page=${i}'>${i}</a></li>`
                );
            }

            // 페이지 그룹의 마지막 페이지가 총 마지막 페이지보다 작을 때 다음 화살 만들기
            if (page < last) {
                pages.push(`<li class="page-item">
                                <a class="page-link" href='?page=${page + 1}' aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>`);
            }
            $('#pagination').append(pages.join(''));
        })

}

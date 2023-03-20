$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  recipeCrawling(page, keyword);
});

function search() {
  const keyword = document.getElementById('searchKeyword').value;
  window.location.href = `/recipe/recipeList?page=1&keyword=${keyword}`;
}

function recipeCrawling(page, keyword) {
  axios({
    url: `/recipe/recipeSearch?page=${page}&keyword=${keyword}`,
    method: 'GET',
  })
    .then((res) => {
      document.getElementById('recipeBox').innerHTML = '';
      document.getElementById('pagination').innerHTML = '';

      const { meta, recipeList } = res.data;
      const { firstPage, lastPage, totalPage } = meta;

      let temp_html = '';
      recipeList.forEach((data) => {
        temp_html += `
        <li class="common_sp_list_li">
            <div class="common_sp_thumb">
              <a href="/recipe/recipeInfo?recipeId=${data.id}" class="common_sp_link">
                <img src="${data.image}" />
              </a>
            </div>
            <div class="common_sp_caption">
              <div class="common_sp_caption_tit line2">${data.name}</div>
              <div class="common_sp_caption_rv">
                <span class="common_sp_caption_buyer" style="vertical-align: middle">${data.views}</span>
              </div>
            </div>
          </li>
          `;
      });
      $('#recipeBox').append(temp_html);

      const pages = [];

      // prev
      if (page > 1) {
        const prev = `<a class="page-link" href='?page=${Number(page) - 1}&keyword=${keyword}'>
              <span>&laquo;</span>
          </a>`;
        pages.push(prev);
      }

      // pages
      for (let i = firstPage; i <= lastPage; i++) {
        const pagesLink = `<a "page-link" href='?page=${i}&keyword=${keyword}'>${i}</a>`;
        pages.push(pagesLink);
      }

      // next
      if (page < totalPage) {
        const next = `<a class="page-link" href='?page=${Number(page) + 1}&keyword=${keyword}'>
              <span>&raquo;</span>
          </a>`;
        pages.push(next);
      }

      $('.pagination').append(pages.join(''));
    })
    .catch((err) => {
      alert('레시피 정보 로드에 실패하였습니다.');
      window.location.href = '/';
    });
}

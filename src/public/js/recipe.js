$(document).ready(function () {
    const page = new URLSearchParams(location.search).get('page') || 1;
    recipeCrawling(page);
  });
  
  function recipeCrawling(page) {
    axios({
      url: `/recipe/recipe?page=${page}`,
      method: 'GET',
    }).then((res) => {
      const { meta, recipes } = res.data;
      const { firstPage, lastPage, totalPage } = meta;
  
      recipes.forEach((data) => {
        console.log(data.image);
        let temp_html = `
        <li class="common_sp_list_li">
            <div class="common_sp_thumb">
              <a href="" class="common_sp_link">
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
        $('#recipeBox').append(temp_html);
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
  }
  
$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  productApiData(page, keyword);
});

function search() {
  const keyword = document.getElementById('searchKeyword').value;
  window.location.href = `/search/searchResult?page=1&keyword=${keyword}`;
}

function productApiData(page, keyword) {
  axios({
    url: `/product/productSearch?page=${page}&keyword=${keyword}`,
    method: 'GET',
  })
    .then((res) => {
      document.getElementById('productContainer').innerHTML = '';
      document.getElementById('pagination').innerHTML = '';

      const { meta, productList } = res.data;
      const { firstPage, lastPage, totalPage } = meta;

      productList.forEach((data) => {
        let temp_html = `
        <div class="card">
          <div class="imgBox">
            <img src="${data.image}" class="product">
          </div>
          <div class="contentBox">
          <h3>${data.salePrice}원<span>${data.price}원</span></h3>
            <h2 class="price">${data.name}</h2>
            <a href="${data.url}" class="buy" target='_blank'>Buy Now</a>
          </div>
        </div>
        `;
        $('.cardBox').append(temp_html);
      });

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
        const pagesLink = `<a class="page-link-number" href='?page=${i}&keyword=${keyword}'>${i}</a>`;
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
      alert('상품 정보 로드에 실패하였습니다.');
      window.location.href = '/';
    });
}

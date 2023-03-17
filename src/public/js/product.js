$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  productApiData(page);
});

function productApiData(page) {
  axios({
    url: `/product/product?page=${page}`,
    method: 'GET',
  })
    .then((res) => {
      const { meta, products } = res.data;
      const { firstPage, lastPage, totalPage } = meta;

      products.forEach((data) => {
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
    .catch((err) => {
      alert('상품 정보 로드에 실패하였습니다.');
      window.location.href = '/';
    });
}

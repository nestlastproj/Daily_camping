$(document).ready(function () {
  productApiData();
});

function productApiData() {
  axios({
    url: '/product/product',
    method: 'GET',
  }).then((res) => {
    res.data.forEach((data) => {
      let temp_html = `
        <div class="card">
          <div class="imgBox">
            <img src="${data.image}" class="product">
          </div>
          <div class="contentBox">
            <h3 style="text-decoration:line-through","color:#bbb">${data.price}원</h3>
            <h3>${data.salePrice}원</h3>
            <h2 class="price">${data.name}</h2>
            <a href="${data.url}" class="buy">Buy Now</a>
          </div>
        </div>
        `;
      $('.cardBox').append(temp_html);
    });
  });
}

$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  datasearch(page, keyword);
});

function search() {
  const keyword = document.getElementById('searchKeyword').value;
  window.location.href = `/search/searchResult?page=1&keyword=${keyword}`;
}

let dataByKeyword;

function datasearch(page, keyword) {
  axios({
    url: `/search/indexSearch?page=${page}&keyword=${keyword}`,
    method: 'GET',
  }).then((res) => {
    console.log(res);
    dataByKeyword = {
      place: [],
      product: [],
      recipe: [],
      article: [],
    };
    res.data.forEach((res) => {
      data = res._source;
      if (data.keyword === '캠핑장') {
        dataByKeyword['place'].push(data);
      }
      if (data.keyword === '캠핑용품') {
        dataByKeyword['product'].push(data);
      }
      if (data.keyword === '레시피') {
        dataByKeyword['recipe'].push(data);
      }
      if (data.keyword === '게시물') {
        dataByKeyword['article'].push(data);
      }
    });

    for (const [key, value] of Object.entries(dataByKeyword)) {
      if (value.length <= 3) {
        value.forEach((data) => {
          displayResult(key, data);
        });
      } else {
        for (let i = 0; i < 3; i++) {
          displayResult(key, value[i]);
        }
        const loadMoreBtn = `
          <button id=${key}btn class="load_more_btn" onclick="loadMoreResults('${key}')">검색 결과 더보기</button>
        `;
        $(`.${key}_box`).append(loadMoreBtn);
      }
    }
  });
}

function displayResult(key, data) {
  if (key === 'place') {
    $('#place_no_search').remove();
    const temp_html = `
    <div class="data_box">
      <ul id="place_title" class="title" onclick="location.href='/place/placeInfo?placeId=${data.id}'">
        상호명: ${data.name}
      </ul>
      <li id="place_content" class="content" onclick="location.href='/place/placeInfo?placeId=${data.id}'">캠핑장 주소: ${data.address} <br> 캠핑장 전화번호: ${data.phone} <br> 지역 : ${data.city} ${data.detailcity} <br> 카테고리: ${data.category}</li>
      </div>
      `;
    $('.place_box').append(temp_html);
  }
  if (key === 'product') {
    $('.product_no_search').remove();
    const temp_html = `
    <div class="data_box">
    <ul id="product_title" class="title" onclick="window.open('${data.url}')">
    상품명: ${data.name}
    </ul>
    
      <li id="product_content" class="content" onclick="window.open('${data.url}')"><img src="${data.image}" > 할인가: ${data.salePrice}  <del style = "font-size: 0.8em">정상가: ${data.price}</del></li>
      </div>
      `;
    $('.product_box').append(temp_html);
  }
  if (key === 'recipe') {
    $('.recipe_no_search').remove();

    const contentDetail = data.content.split('$');

    const temp_html = `
    <div class="data_box">
      <ul id="recipe_title" class="title" onclick="location.href='recipe/recipeInfo?recipeId=${data.id}'">
        요리명: ${data.name}
      </ul>
      <li id="recipe_content" class="content" onclick="location.href='recipe/recipeInfo?recipeId=${data.id}'"> <img src="${data.image}">${contentDetail}</li>
      </div>
      `;
    $('.recipe_box').append(temp_html);
  }
  if (key === 'article') {
    $('.article_no_search').remove();
    const temp_html = `
    <div class="data_box">
      <ul id="recipe_title" class="title">
        제목: ${data.name}
      </ul>
      <li id="recipe_content" class="content">내용: ${data.content}</li>
      </div>
      `;
    $('.article_box').append(temp_html);
  }

  const currentLength = $(`.${key}_box ul`).length;

  if (currentLength === 0) {
    let temp_html = `
    <div class="data_box">
      검색 결과가 없습니다.    
    </div>
    `;
    $(`.${key}_box`).append(temp_html);
  }
}

function loadMoreResults(key) {
  $(`#${key}btn`).remove();

  const data = dataByKeyword[key];
  const currentLength = $(`.${key}_box ul`).length;

  for (let i = currentLength; i < currentLength + 3 && i < data.length; i++) {
    const item = data[i];

    if (key === 'place') {
      $('.place_no_search').remove();
      let temp_html = `
      <div class="data_box">
        <ul id="place_title" class="title" onclick="location.href='/place/placeInfo?placeId=${item.id}'">
          상호명: ${item.name}
        </ul>
        <li id="place_content" class="content" onclick="location.href='/place/placeInfo?placeId=${item.id}'">캠핑장 주소: ${item.address} <br> 캠핑장 전화번호: ${item.phone} <br> 지역 : ${item.city} ${item.detailcity} <br> 카테고리: ${item.category}</li>
      </div>
        `;
      $(`.${key}_box`).append(temp_html);
    } else if (key === 'product') {
      $('.product_no_search').remove();
      let temp_html = `
      <div class="data_box">
        <ul id="product_title" class="title" onclick="window.open('${item.url}')">
          상품명: ${item.name}
        </ul>
        <li id="product_content" class="content" onclick="window.open('${item.url}')"><img src="${item.image}" > 할인가: ${item.salePrice}  <del style = "font-size: 0.8em">정상가: ${item.price}</del></li>
      </div>
        `;
      $(`.${key}_box`).append(temp_html);
    } else if (key === 'recipe') {
      $('.recipe_no_search').remove();
      const contentDetail = item.content.split('$');

      let temp_html = `
      <div class="data_box">
        <ul id="recipe_title" class="title" onclick="location.href='recipe/recipeInfo?recipeId=${item.id}'">
          요리명: ${item.name}
        </ul>
        <li id="recipe_content" class="content" onclick="location.href='recipe/recipeInfo?recipeId=${item.id}'"> <img src="${item.image}">${contentDetail}</li>
      </div>
        `;
      $(`.${key}_box`).append(temp_html);
    } else if (key === 'article') {
      $('.article_no_search').remove();
      let temp_html = `
      <div class="data_box">
        <ul id="recipe_title" class="title">
          ${item.name}
        </ul>
        <li id="recipe_content" class="content">${item.content}</li>
      </div>
        `;
      $(`.${key}_box`).append(temp_html);
    }
  }
  const loadMoreBtn = `
        <button id=${key}btn class="load_more_btn" onclick="loadMoreResults('${key}')">검색 결과 더보기</button>
      `;

  currentLength + 3 >= dataByKeyword[key].length ? $(`#${key}btn`).remove() : $(`.${key}_box`).append(loadMoreBtn);

  if (currentLength + 3 >= data.length) {
    $(`#${key}_more_btn`).hide();
  }
}

// function loadMoreResults('place') {
//   axios
// }
// function loadMoreResults('product')
// function loadMoreResults('recipe')
// function loadMoreResults('article')

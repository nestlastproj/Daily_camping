$(document).ready(function () {
  const recipeId = new URLSearchParams(location.search).get('recipeId');
  recipeDetailData(recipeId);
});

function recipeDetailData(recipeId) {
  axios({
    url: `/recipe/recipeDetail?recipeId=${recipeId}`,
    method: 'GET',
  }).then((res) => {
    console.log(res);
    console.log(res.data);
    const responese = res.data[0];
    document.getElementById('recipe-title').innerHTML = `${responese.name}`;

    let temp_html = `
            <div class="page cover-front" onclick="movePage(this, 1)">
              <img src="${responese.image}" alt="">
            </div>
            <div class="page cover-front" onclick="movePage(this, 2)"></div>
      `;
    $('.book').append(temp_html);

    // console.log(res.data[0], 1111111111);
    // console.log(res.data[0].content, 'content total');

    // const responese = res.data[0]

    // const contentDeail1 = res.data[0].content.split('\n');

    const contentimages = responese.contentimage.split(',');
    const contentDetail = responese.content
      .split('\n')
      .map((step) => step.trim().replace(/\n/g, ''))
      .filter((step) => step !== '');

    console.log(responese.content.split('\n'));
    console.log(contentimages, 'contentimages', contentDetail, 'contentDetail');

    if (contentDetail.length % 2 === 0) {
      page = 1;
      let temp_html = `
                <div class="page text-page" onclick="movePage(this, ${page + 2})">
                  <img src="https://recipe1.ezmember.co.kr/cache/recipe/2018/06/27/2c0c89aacd9092e4873ed5f5a792daa71.png" alt="">
                  <p><span>${page}</span></p>
                </div>
                `;
      $('.book').append(temp_html);
      page++;
    } else (contentDetail.length % 2 === 1) {
      page = 1;
      let temp_html = `
                <div class="page text-page" onclick="movePage(this, ${page + 2})">
                  <img src="https://recipe1.ezmember.co.kr/cache/recipe/2018/06/27/2c0c89aacd9092e4873ed5f5a792daa71.png" alt="">
                  <p><span>${page}</span></p>
                </div>
                `;
      $('.book').append(temp_html);
      page++;
    }

    $('.book').append(temp_html);
    // console.log(contentDeail1[0], 2222222222222);
    // console.log(contentDeail1[1], 333333333333);
    // console.log(contentDeail1[2], 444444444444);
    // console.log(contentDeail1[3], 555555555555);
    // console.log(contentDeail1[4], 666666666666);

    // console.log(contentDeail1.length);

    // temp_html = `

    // `;
  });
}

let currentPage = 1;

function toggleClass(e, toggleClassName) {
  if (e.className.includes(toggleClassName)) {
    e.className = e.className.replace(' ' + toggleClassName, '');
  } else {
    e.className += ' ' + toggleClassName;
  }
}

function movePage(e, page) {
  if (page == currentPage) {
    currentPage += 2;
    toggleClass(e, 'left-side');
    toggleClass(e.nextElementSibling, 'left-side');
  } else if ((page = currentPage - 1)) {
    currentPage -= 2;
    toggleClass(e, 'left-side');
    toggleClass(e.previousElementSibling, 'left-side');
  }
}

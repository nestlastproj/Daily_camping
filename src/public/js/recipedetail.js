$(document).ready(function () {
  const recipeId = new URLSearchParams(location.search).get('recipeId');
  recipeDetailData(recipeId);
});

function recipeDetailData(recipeId) {
  axios({
    url: `/recipe/recipeDetail?recipeId=${recipeId}`,
    method: 'GET',
  })
  .then((res) => {
    const responese = res.data;
    document.getElementById('recipe-title').innerHTML = `${responese.name}`;
    
    let temp1 = `
            <div class="page cover-front" onclick="movePage(this, 1)">
              <img src="${responese.image}" alt="">
            </div>
            <div class="page cover-front" onclick="movePage(this, 2)"></div>
      `;
    $('.book').append(temp1);

    const contentimages = responese.contentimage.split(',');
    const contentDetail = responese.content.split('$')

    if (contentDetail.length % 2 === 0) {
      for (let i = 0; i < contentDetail.length; i++) {
        const page = i;
        const img = contentimages[i];
        const recipe = contentDetail[i];

        let temp_html = `
                <div class="page text-page" onclick="movePage(this, ${page + 3})">
                  <img src="${img}" alt="">
                  <p><span>${page + 1}. </span>${recipe}</p>
                </div>
                `;
        $('.book').append(temp_html);
      }
    } else {
      for (let i = 0; i < contentDetail.length; i++) {
        const page = i;
        const img = contentimages[i];
        const recipe = contentDetail[i];

        let temp_html = `
                <div class="page text-page" onclick="movePage(this, ${page + 3})">
                  <img src="${img}" alt="">
                  <p><span>${page + 1}. </span>${recipe}</p>
                </div>
                `;
        $('.book').append(temp_html);
      }

      const total = contentDetail.length;
      let temp = `<div class="page text-page" onclick="movePage(this, ${total + 1})">
                </div>`;
      $('.book').append(temp);
    }
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

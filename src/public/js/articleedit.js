$(document).ready(function () {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  myArticleEdit(articleId);
});

function myArticleEdit(articleId) {
  axios({
    url: `/article/myArticleEdit/${articleId}`,
    method: 'GET',
  }).then((res) => {
    let { title, content, image } = res.data;
    let temp_html = `
    <div class="title">
            <dl>
              <dt>제목</dt>
              <dd><input type="text" id="title" name="subject" class="form-control" value="${title}"></dd>
            </dl>
          </div>
          <div id="container">
            <textarea name="contents" id="content" class="form-control">${content}</textarea>
          </div>
          <div class="inputfield">
            <input type="file" id="image" name="file" class="input"/>
          </div>
    `;
    $('.boardWrite').append(temp_html);
  });
}

function putMyArticle() {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('file', image);

  axios
    .put(`/article/${articleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      alert('수정 완료');
      location.href = '/article/list'
    });
}

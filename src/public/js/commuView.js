$(document).ready(function () {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  const page = new URLSearchParams(location.search).get('page') || 1;
  getmyprofiledata(articleId);
  getComment(articleId, page);
});

function getmyprofiledata(articleId) {
  axios({
    method: 'get',
    url: `/article/${articleId}`,
  })
    .then((res) => {
      let { title, content, createdAt, image } = res.data;
      const createdTime = new Date(createdAt);
      const year = createdTime.getFullYear();
      const month = createdTime.getMonth() + 1;
      const day = createdTime.getDate();
      let hour = createdTime.getHours();
      let minute = createdTime.getMinutes();
      if (hour.toString().length === 1) {
        hour = '0' + hour.toString();
      }
      if (minute.toString().length === 1) {
        minute = '0' + minute.toString();
      }
      let temp = `<div class="title" id="title">${title}</div>
                            <div class="info">
                                <dl>
                                    <dt>작성일</dt>
                                    <dd>
                                    <div id="createdAt">${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</div>
                                    </dd>
                                </dl>
                            </div>
                        <div class="profile-image">
                            <img src="/../uploads/${image}" id="image">
                        </div>
                        <div id="content">${content}</div>`;
      $('.boardView').append(temp);
    })
    // <dl>
    //     <dt>조회</dt>
    //     <dd>카운트</dd>
    // </dl>
    .catch((err) => {
      console.log(err, 'err');
    });
}

function deleteArticle() {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    method: 'delete',
    url: `/article/delete/${articleId}`,
  })
    .then((res) => {
      confirm('삭제하시겠습니까?');
      window.location.href = '/article/list';
    })
    .catch((err) => {
      console.log(err);
    });
}

function getComment(articleId, page) {
  axios({
    url: `/comment/mycomment/${articleId}?page=${page}`,
    method: 'get',
  }).then((res) => {
    const { meta, comments } = res.data;
    // console.log(comments);
    const { firstPage, lastPage, totalPage } = meta;

    comments.forEach((data) => {
      const createdTime = new Date(data.createdAt);
      const year = createdTime.getFullYear();
      const month = createdTime.getMonth() + 1;
      const day = createdTime.getDate();
      let hour = createdTime.getHours();
      let minute = createdTime.getMinutes();
      if (hour.toString().length === 1) {
        hour = '0' + hour.toString();
      }
      if (minute.toString().length === 1) {
        minute = '0' + minute.toString();
      }
      let temp_html = `   <div class="boxmeta">
                                    <strong>${data.user.nickname}</strong>
                                    <span class="date">${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</span>
                          </div>
                          <div>
                              <p class="text">${data.content}</p>
                          </div>
                          <button type="button" class="btnregister" onclick="updatecomment(${data.id})">
                            수정
                          </button>
                          <button type="button" class="btnregister2" onclick="deletecomment(${data.id})">
                            삭제
                          </button>
                            `;
      $('.boxcontent').append(temp_html);
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
  // .catch((err) => {
  //   alert('상품 정보 로드에 실패하였습니다.');
  //   window.location.href = '/';
  // });
}

function postcomment() {
  let comment = document.getElementById('comment').value;
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];

  axios
    .post(`/comment/${articleId}`, {
      content: comment,
    })
    .then((res) => {
      alert('게시 완료');
      window.location.reload();
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function deletecomment(id) {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    method: 'delete',
    url: `/comment/delete/${articleId}/${id}`,
  })
    .then((res) => {
      confirm('삭제하시겠습니까?');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updatecomment(commentId) {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    url: `/comment/${articleId}/${commentId}`,
    method: 'get',
  })
    .then((res) => {
      console.log(res);
      document.getElementById('contentbox').innerHTML = '';
      temp_html = `
        <div>
            <textarea class="text" id="commenttext">${res.data.content}</textarea>
        </div>
        <button type="button" class="btnregister" onclick="commentPost(${res.data.id})">
          수정
        </button>
        <button type="button" class="btnregister2">
          취소
        </button>
      `;
      $('.boxcontent').append(temp_html);
      // window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function commentPost(commentId) {
  const content = document.getElementById('commenttext').value;
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];

  axios.put(`/comment/${articleId}/${commentId}`,
  { content: content }
  ).then(window.location.reload());
}

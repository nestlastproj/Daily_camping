$(document).ready(function () {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  const page = new URLSearchParams(location.search).get('page') || 1;
  access()
  getmyprofiledata(articleId);
  countComment(articleId);
  articleLikeCount();
  getComment(articleId, page);
});

function access() {
  axios.get('/auth/isLoggined').then((res) => {
  }).catch((err) => {
    alert('로그인 후 이용 가능 합니다.')
    location.href = '/auth/login'
  })
}

function loginuser(userId) {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios.get(`/auth/isLoggined`)
    .then((res) => {
      if (userId == res.data.id) {
        let temp = `<a href="/article/edit/${articleId}" class="on">수정</a>
                    <a onclick="deleteArticle()" class="off">삭제</a>
                    <a href="/article/list" class="on">목록</a>`
        $('.buttons').append(temp)
      }
      else {
        let temp = `<a href="/article/list" class="on">목록</a>`
        $('.buttons').append(temp)
      }
    })
}

function articleLikeCount() {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    method: 'get',
    url: `/article/likecount/${articleId}`,
  })
    .then((res) => {
      let temp = `<div class="heart">
                    <label class="like">
                      <input id="myLike${articleId}" type="checkbox" />
                      <div class="hearth" onclick="likeArticle()"></div>
                    </label>
                  </div>
                  <h3>${res.data}</h3>`;
      $('.articlelikecount').append(temp);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getmyprofiledata(articleId) {
  axios({
    method: 'get',
    url: `/article/${articleId}`,
  })
    .then((res) => {
      let { title, content, createdAt, image, user } = res.data;
      let nickname = user.nickname;
      let userId = user.id;
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
      if (image === null) {

        let temp = `<div class="title" id="title">${title}</div>
                            <div class="info">
                                <dl>
                                    <dt>작성일</dt>
                                    <dd>
                                    <div id="createdAt">${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</div>                                 
                                    </dd>
                                    <dt>작성자</dt>
                                    <dd>
                                    <div id="nickname">${nickname}</div>                                 
                                    </dd>
                                </dl>
                            </div>
                        <div id="content">${content}</div>`;
        $('.boardView').append(temp);
        getMyArticleLike();
        loginuser(userId);
      } else {
        let temp = `<div class="title" id="title">${title}</div>
                            <div class="info">
                                <dl>
                                    <dt>작성일</dt>
                                    <dd>
                                    <div id="createdAt">${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분</div>                                 
                                    </dd>
                                    <dt>작성자</dt>
                                    <dd>
                                    <div id="nickname">${nickname}</div>                                 
                                    </dd>
                                </dl>
                            </div>
                        <div class="profile-image">
                            <img src="https://dailycampingbucket.s3.ap-northeast-2.amazonaws.com/${image}" id="image">
                        </div>
                        <div id="content">${content}</div>`;
        $('.boardView').append(temp);
        getMyArticleLike();
        loginuser(userId);
      }

    })
    .catch((err) => {
      console.log(err, 'err');
    });
}

function getMyArticleLike() {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];

  axios({
    url: `/myArticleLike`,
    method: 'get',
  })
    .then((res) => {
      const data = res.data
      data.forEach((data) => {
        if (data.id == articleId) {
          document.getElementById(`myLike${articleId}`).checked = true
        }
      })
    })
    .catch((err) => {
      console.log('error', err);
    });

}

function deleteArticle() {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    method: 'delete',
    url: `/article/${articleId}`,
  })
    .then((res) => {
      alert('삭제 완료!')
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
                        <div class="button${data.id}">
                        <button type="button" class="btnregister" onclick="likeComment(${data.id})">
                          좋아요
                        </button>
                        <div class="commentlikenumber commentlikecount${data.id}"></div>
                        </div>
                            `;
      $('.boxcontent').append(temp_html);
      commentLikeCount(data.id);
      loginuser2(data)
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
      const pagesLink = `<a class="page-link-number" href='?page=${i}'>${i}</a>`;
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
    var links = document.querySelectorAll('.page-link-number');
    if (links.length !== 0 && page <= 5) {
        const now = page - 1
        links[now].classList.add("active");
    } else if (page >5) {
        const now = page % 5
        if (now === 0) {
            links[4].classList.add("active");
        } else {
        links[now - 1].classList.add("active");
        }
    }
  });
}

function loginuser2(data) {
  axios.get(`/auth/isLoggined`)
    .then((res) => {
      if (data.user.id == res.data.id) {
        let temp = `<button type="button" class="btnregister" onclick="updateComment(${data.id})">
                      수정
                    </button>
                    <button type="button" class="btnregister2" onclick="deleteComment(${data.id})">
                      삭제
                    </button>
                    `
        $(`.button${data.id}`).prepend(temp)
      }
    })
}

function commentLikeCount(id) {
  axios({
    method: 'get',
    url: `/commentlikecount/${id}`,
  })
    .then((res) => {
      $(`.commentlikecount${id}`).append(`${res.data}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function postComment() {
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
      alert(err.response.data.message);
    });
}

function deleteComment(id) {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    method: 'delete',
    url: `/comment/articles/${articleId}/comments/${id}`,
  })
    .then((res) => {
      alert('삭제 완료!')
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateComment(id) {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    url: `/comment/${articleId}/${id}`,
    method: 'get',
  })
    .then((res) => {
      document.getElementById('contentbox').innerHTML = '';
      temp_html = `
        <div>
            <textarea class="text" id="commenttext">${res.data.content}</textarea>
        </div>
        <button type="button" class="btnregister" onclick="commentPost(${res.data.id})">
          수정
        </button>
        <button type="button" class="btnregister2" onclick="location.href='/article/view/${articleId}'">
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

  axios.put(`/comment/${articleId}/${commentId}`, { content: content }).then(window.location.reload());
}

function countComment(articleId) {
  axios({
    url: `/comment/count/${articleId}`,
    method: 'get',
  })
    .then((res) => {
      let temp = `<div class="boxtotal">
                    댓글 <span><span>${res.data}</span></span>
                  </div>`;
      $('#count').append(temp);
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeArticle() {
  const articleIdUrl = window.location.pathname;
  const articleId = articleIdUrl.split('/')[3];
  axios({
    url: `/articles/${articleId}/like`,
    method: 'post',
  })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeComment(id) {
  axios({
    url: `/comments/${id}/like`,
    method: 'post',
  })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

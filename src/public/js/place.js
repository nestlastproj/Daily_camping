$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  placeApidata(page, keyword);
});

function search() {
  const keyword = document.getElementById('searchKeyword').value;
  window.location.href = `/search/searchResult?page=1&keyword=${keyword}`;
}

function placeApidata(page, keyword) {
  axios({
    url: `/place/placesearch?page=${page}&keyword=${keyword}`,
    method: 'GET',
  })
    .then((res) => {
      document.getElementById('placeContainer').innerHTML = '';
      document.getElementById('pagination').innerHTML = '';

      const { meta, placeList } = res.data;
      const { firstPage, lastPage, totalPage } = meta;

      placeList.forEach((data) => {
        let temp_html = `
        <div class="stack">
        <div class="card">
          <div class="image" id="map${data.id}">
          <img referrerpolicy="no-referrer" src="${data.image}"
          </div>
          <div class="text" onclick="location.href='/place/placeInfo?placeId=${data.id}'">
            <h3>${data.name}</h3>
            <h3>${data.address}</h3>
          </div>
          <div class="heart">
            <label class="like">
              <input id="myLike${data.id}" type="checkbox" />
              <div class="hearth" onclick="likeUser(${data.id},${page})"></div>
            </label>
          </div>
          <h4><div class="totalcount${data.id}"></div></h4>
        </div>
      </div>
      `;
        $('.container').append(temp_html);

        placeLike(`${data.id}`);
        mylike(data.id, page);
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
      // alert('캠핑장 정보 로드에 실패하였습니다.');
      console.log(err);
      // window.location.href = '/';
    });
}

function placeLike(id) {
  axios({
    url: `/place/likecount/${id}`,
    method: 'get',
  }).then((res) => {
    $(`.totalcount${id}`).append(res.data);
  });
}

function like(id, page) {
  console.log(id, page);
  axios({
    url: `/place/${id}/like`,
    method: 'post',
  })
    .then((res) => {
      $(`.totalcount${id}`).empty();
      placeLike(id);
      mylike(id, page);
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function mylike(id, page) {
  axios({
    url: `/myplacelike`,
    method: 'get',
  })
    .then((res) => {
      const data = res.data;
      data.forEach((data) => {
        if (page === 1) {
          if (id == data.id) {
            document.getElementById(`myLike${data.id}`).checked = true;
          }
        } else {
          if (id == data.id) {
            document.getElementById(`myLike${data.id}`).checked = true;
          }
        }
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function likeUser(id, page) {
  axios
    .get('/auth/isLoggined')
    .then((res) => {
      like(id, page);
    })
    .catch((err) => {
      alert('로그인 후 이용 가능 합니다.');
      location.href = '/auth/login';
    });
}

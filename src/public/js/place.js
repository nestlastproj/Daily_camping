$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  const keyword = new URLSearchParams(location.search).get('keyword') || '';
  placeApidata(page, keyword);
});

function search() {
  const keyword = document.getElementById('searchKeyword').value;
  window.location.href = `/place/placeList?page=1&keyword=${keyword}`;
}

function placeApidata(page, keyword) {
  axios({
    url: `/place/placeSearch?page=${page}&keyword=${keyword}`,
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
          </div>
          <div class="text" onclick="location.href='/place/placeInfo?placeId=${data.id}'">
            <h3>${data.name}</h3>
            <h3>${data.address}</h3>
          </div>
          <div class="heart">
            <label class="like">
              <input id="myLike${data.id}" type="checkbox" />
              <div class="hearth" onclick="like(${data.id})"></div>
            </label>
          </div>
          <h4><div class="totalcount${data.id}"></div></h4>
        </div>
      </div>
      `;
        $('.container').append(temp_html);

        placeLike(`${data.id}`);

        let roadviewContainer = document.getElementById(`map${data.id}`);
        let roadview = new kakao.maps.Roadview(roadviewContainer);
        let roadviewClient = new kakao.maps.RoadviewClient();
        let position = new kakao.maps.LatLng(data.y, data.x);

        roadviewClient.getNearestPanoId(position, 50, async function (panoId) {
          await roadview.setPanoId(panoId, position);
          if (!panoId) {
            function a() {
              mapOption = {
                center: new kakao.maps.LatLng(data.y, data.x),
                level: 4,
              };
              let map = new kakao.maps.Map(roadviewContainer, mapOption);

              let imageSrc = 'https://cdn-icons-png.flaticon.com/512/5695/5695276.png',
                imageSize = new kakao.maps.Size(64, 69),
                imageOption = { offset: new kakao.maps.Point(27, 69) };

              let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                markerPosition = new kakao.maps.LatLng(data.y, data.x);

              let marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
              });

              marker.setMap(map);
            }

            setTimeout(a, 100);
          }
        });
      });
      mylike(page);

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
        const pagesLink = `<a "page-link" href='?page=${i}&keyword=${keyword}'>${i}</a>`;
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

function like(id) {
  axios({
    url: `/place/${id}/like`,
    method: 'post',
  })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function mylike(page) {
  axios({
    url: `/myplacelike`,
    method: 'get',
  })
    .then((res) => {
      const data = res.data;
      data.forEach((data) => {
        if (page === 1) {
          if (data.id <= page * 6) {
            document.getElementById(`myLike${data.id}`).checked = true;
          }
        } else {
          if ((page - 1) * 6 < data.id && data.id <= page * 6) {
            document.getElementById(`myLike${data.id}`).checked = true;
          }
        }
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
}

function addressKindChange(e) {
  var gyeonggi = [
    '수원시',
    '고양시',
    '용인시',
    '성남시',
    '부천시',
    '화성시',
    '안산시',
    '남양주시',
    '안양시',
    '평택시',
    '시흥시',
    '파주시',
    '의정부시',
    '김포시',
    '광주시',
    '광명시',
    '군포시',
    '하남시',
    '오산시',
    '양주시',
    '이천시',
    '구리시',
    '안성시',
    '포천시',
    '의왕시',
    '여주시',
    '동두천시',
    '과천시',
    '가평군',
    '양평군',
    '연천군',
  ];
  var gangwon = [
    '춘천시',
    '원주시',
    '강릉시',
    '동해시',
    '태백시',
    '속초시',
    '삼척시',
    '홍천군',
    '횡성군',
    '영월군',
    '평창군',
    '정선군',
    '철원군',
    '화천군',
    '양구군',
    '인제군',
    '고성군',
    '양양군',
  ];
  var chungcheongbuk = [
    '청주시',
    '충주시',
    '제천시',
    '보은군',
    '옥천군',
    '영동군',
    '증평군',
    '진천군',
    '괴산군',
    '음성군',
    '단양군',
  ];
  var chungcheongnam = [
    '천안시',
    '공주시',
    '보령시',
    '아산시',
    '서산시',
    '논산시',
    '계롱시',
    '당진시',
    '금산군',
    '부여군',
    '서천군',
    '청양군',
    '홍성군',
    '예산군',
    '태안군',
  ];
  var jeollabuk = [
    '전주시',
    '군산시',
    '익산시',
    '정읍시',
    '남원시',
    '김제시',
    '완주군',
    '진안군',
    '무주군',
    '장수군',
    '임실군',
    '순창군',
    '고창군',
    '부안군',
  ];
  var jeollanam = [
    '목포시',
    '여수시',
    '순천시',
    '나주시',
    '광양시',
    '담양군',
    '곡성군',
    '구례군',
    '고흥군',
    '보성군',
    '화순군',
    '장흥군',
    '강진군',
    '해남군',
    '영암군',
    '무안군',
    '함평군',
    '영광군',
    '장성군',
    '완도군',
    '진도군',
    '신안군',
  ];
  var gyeongsangbuk = [
    '포항시',
    '경주시',
    '김천시',
    '안동시',
    '구미시',
    '영주시',
    '영천시',
    '상주시',
    '문경시',
    '경산시',
    '군위군',
    '의성군',
    '청송군',
    '영양군',
    '영덕군',
    '청도군',
    '고령군',
    '성주군',
    '칠곡군',
    '예천군',
    '봉화군',
    '울진군',
    '울릉군',
  ];
  var gyeongsangnam = [
    '창원시',
    '진주시',
    '통영시',
    '사천시',
    '김해시',
    '밀양시',
    '거제시',
    '양산시',
    '의령군',
    '함안군',
    '창녕군',
    '고성군',
    '남해군',
    '하동군',
    '산청군',
    '함양군',
    '거창군',
    '합천군',
  ];
  var jeju = ['제주시', '서귀포시'];
  var seoul = [];
  var busan = [];
  var daegu = [];
  var incheon = [];
  var gwangju = [];
  var daejeon = [];
  var ulsan = [];
  var sejong = [];
  var target = document.getElementById('si');

  if (e.value === '1') var d = gyeonggi;
  else if (e.value === '2') var d = gangwon;
  else if (e.value === '3') var d = chungcheongbuk;
  else if (e.value === '4') var d = chungcheongnam;
  else if (e.value === '5') var d = jeollabuk;
  else if (e.value === '6') var d = jeollanam;
  else if (e.value === '7') var d = gyeongsangbuk;
  else if (e.value === '8') var d = gyeongsangnam;
  else if (e.value === '9') var d = jeju;
  else if (e.value === '10') var d = seoul;
  else if (e.value === '11') var d = busan;
  else if (e.value === '12') var d = daegu;
  else if (e.value === '13') var d = incheon;
  else if (e.value === '14') var d = gwangju;
  else if (e.value === '15') var d = daejeon;
  else if (e.value === '16') var d = ulsan;
  else if (e.value === '17') var d = sejong;

  target.options.length = 0;

  for (x in d) {
    var opt = document.createElement('option');
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  }
}

console.log($('#do option:selected').text());
console.log($('#si option:selected').text());

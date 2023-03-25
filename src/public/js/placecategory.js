function addressKindChange(e) {
  let gyeonggi = [
    '전체',
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
  let gangwon = [
    '전체',
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
  let chungcheongbuk = [
    '전체',
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
  let chungcheongnam = [
    '전체',
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
  let jeollabuk = [
    '전체',
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
  let jeollanam = [
    '전체',
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
  let gyeongsangbuk = [
    '전체',
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
  let gyeongsangnam = [
    '전체',
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
  let jeju = ['전체', '제주시', '서귀포시'];
  let seoul = [
    '전체',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];
  let busan = [
    '전체',
    '중구',
    '서구',
    '동구',
    '영도구',
    '부산진구',
    '동래구',
    '남구',
    '북구',
    '해운대구',
    '사하구',
    '금정구',
    '강서구',
    '연제구',
    '수영구',
    '사상구',
    '기장군',
  ];
  let daegu = ['전체', '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'];
  let incheon = ['전체', '중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'];
  let gwangju = ['전체', '동구', '서구', '남구', '북구', '광산구'];
  let daejeon = ['전체', '동구', '중구', '서구', '유성구', '대덕구'];
  let ulsan = ['전체', '중구', '남구', '동구', '북구', '울주군'];
  let sejong = ['세종시'];
  let target = document.getElementById('si');

  if (e.value === '1') {
    d = gyeonggi;
  } else if (e.value === '2') {
    d = gangwon;
  } else if (e.value === '3') {
    d = chungcheongbuk;
  } else if (e.value === '4') {
    d = chungcheongnam;
  } else if (e.value === '5') {
    d = jeollabuk;
  } else if (e.value === '6') {
    d = jeollanam;
  } else if (e.value === '7') {
    d = gyeongsangbuk;
  } else if (e.value === '8') {
    d = gyeongsangnam;
  } else if (e.value === '9') {
    d = jeju;
  } else if (e.value === '10') {
    d = seoul;
  } else if (e.value === '11') {
    d = busan;
  } else if (e.value === '12') {
    d = daegu;
  } else if (e.value === '13') {
    d = incheon;
  } else if (e.value === '14') {
    d = gwangju;
  } else if (e.value === '15') {
    d = daejeon;
  } else if (e.value === '16') {
    d = ulsan;
  } else if (e.value === '17') {
    d = sejong;
  }

  target.options.length = 0;

  for (x in d) {
    let opt = document.createElement('option');
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  }

  const cityname = $('#do option:selected').text();
  const detailcity = $('#si option:selected').text();
  const page = new URLSearchParams(location.search).get('page') || 1;

  axios({
    url: `/place/placeCategorySearch?page=${page}&cityname=${cityname}&detailcity=${detailcity}`,
    method: 'GET',
  }).then((res) => {
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
          <h3><div class="totalcount${data.id}"></div></h3>
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
      const prev = `<a class="page-link" onclick="pageCheck('${Number(page) - 1}','${cityname}','${detailcity}')" href='#'>
            <span>&laquo;</span>
        </a>`;
      pages.push(prev);
    }

    // pages
    for (let i = firstPage; i <= lastPage; i++) {
      const pagesLink = `<a class="page-link-number" onclick="pageCheck('${i - 1}','${cityname}','${detailcity}')" href='#'>${i}</a>`;
      pages.push(pagesLink);
    }

    // next
    if (page < totalPage) {
      const next = `<a class="page-link" onclick="pageCheck('${Number(page) + 1}','${cityname}','${detailcity}')" href='#'>
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

function detail() {
  const cityname = $('#do option:selected').text();
  const detailcity = $('#si option:selected').text();
  const page = new URLSearchParams(location.search).get('page') || 1;

  axios({
    url: `/place/placeCategorySearch?page=${page}&cityname=${cityname}&detailcity=${detailcity}`,
    method: 'GET',
  }).then((res) => {
    document.getElementById('placeContainer').innerHTML = '';
    document.getElementById('pagination').innerHTML = '';

    const { meta, placeList } = res.data;
    const { firstPage, lastPage, totalPage } = meta;
    if (placeList.length !== 0) {
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
              <div class="hearth" onclick="loginUser(${data.id})"></div>
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
        const prev = `<a class="page-link" onclick="pageCheck('${Number(page) - 1}','${cityname}','${detailcity}')" href='#'>
            <span>&laquo;</span>
        </a>`;
        pages.push(prev);
      }

      // pages
      for (let i = firstPage; i <= lastPage; i++) {
        const pagesLink = `<a "page-link" onclick="pageCheck('${i - 1}','${cityname}','${detailcity}')" href='#'>${i}</a>`;
        pages.push(pagesLink);
      }

      // next
      if (page < totalPage) {
        const next = `<a class="page-link" onclick="pageCheck('${Number(page) + 1}','${cityname}','${detailcity}')" href='#'>
            <span>&raquo;</span>
        </a>`;
        pages.push(next);
      }

      $('.pagination').append(pages.join(''));
    } else {
      alert('해당 지역의 캠핑장이 없습니다.');
    }
  });
}

function pageCheck(page, cityname, detailcity) {
  history.pushState(null, null, `?page=${Number(page) + 1}&cityname=${cityname}&detailcity=${detailcity}`);
  detail();
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

function loginUser(id) {
  axios.get('/auth/isLoggined').then((res) => {
    like(id)
  }).catch((err) => {
    alert('로그인 후 이용 가능 합니다.')
    location.href = '/auth/login'
  })
}
$(document).ready(function () {
  const placeId = new URLSearchParams(location.search).get('placeId');
  placeDetailData(placeId);
});

function placeDetailData(placeId) {
  axios({
    url: `/place/placeDetail?placeId=${placeId}`,
    method: 'GET',
  })
    .then((res) => {
      res.data.forEach((data) => {
        let temp_html = `
        <div class="campsite-title">
          <h1>${data.name}</h1>
        </div>
        <div class="map"> 
          <div class="frame">
            <div class="inner-frame">
              <div class="mat" id="mapbox">
                <img src="" id="mapimage">
              </div>
            </div>
          </div>
        </div>
        <div class="btnbox"><button class="viewbtn1" onclick="roadview(${data.x}, ${data.y})">로드뷰 보기</button><button class="viewbtn2" onclick="mapview(${data.x}, ${data.y})">지도 보기</button></div>
        <div class="link">
          <a href="${data.url}" target="blank">More campsite information</a>
        </div>
        <div class="review">
          <h2>review <span>${data.review.length}</span></h2>
          <a class="button" onclick="location.href='/review/reviewWrite/${data.id}'">
            <div class="button__line"></div>
            <div class="button__line"></div>
            <span class="button__text">write</span>
            <div class="button__drow1"></div>
            <div class="button__drow2"></div>
          </a>
        </div>
        `;
        $('.container').append(temp_html);

        let MapContainer = document.getElementById('mapbox');
        MapOption = {
          center: new kakao.maps.LatLng(data.y, data.x),
          level: 4,
        };
        let map = new kakao.maps.Map(MapContainer, MapOption);

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

        res.data[0].review.forEach((data) => {
          const createdTime = new Date(data.createdAt);
          const year = createdTime.getFullYear();
          const month = createdTime.getMonth() + 1;
          const day = createdTime.getDate();
          const hour = createdTime.getHours();
          const minute = createdTime.getMinutes();

          let temp_html = `
        <div class="card" onclick="location.href='/review/reviewView?reviewId=${data.id}'">
           <img src="https://dailycampingbucket.s3.ap-northeast-2.amazonaws.com/${data.image}" class="card__image" alt="brown couch" />
           <div class="card__content">
             <time class="card__date">${year}년 ${month}월 ${day}일  ${hour}시${minute}분</time>
             <time class="card__writer">작성자: ${data.user.nickname}</time>
             <span class="card__title">제목: ${data.title}<span>
             <time class="card__count">조회수</time>
           </div>
         </div>
        `;
          $('.will-fadeIn').append(temp_html);
        });
      });
    })
    .catch((err) => {
      alert('캠핑장 정보 또는 리뷰 정보 로드에 실패하였습니다.');
      //   location.href = '/';
      console.log(err);
    });
}

function roadview(x, y) {
  let roadviewContainer = document.getElementById('mapbox');
  let roadview = new kakao.maps.Roadview(roadviewContainer);
  let roadviewClient = new kakao.maps.RoadviewClient();
  let position = new kakao.maps.LatLng(y, x);

  roadviewClient.getNearestPanoId(position, 50, async function (panoId) {
    await roadview.setPanoId(panoId, position);
    if (!panoId) {
      function noimage() {
        alert('로드뷰가 지원되지 않는 캠핑장입니다.');
        window.location.reload();
      }
    }
    setTimeout(noimage, 100);
  });
}

function mapview(x, y) {
  let MapContainer = document.getElementById('mapbox');
  MapOption = {
    center: new kakao.maps.LatLng(y, x),
    level: 4,
  };
  let map = new kakao.maps.Map(MapContainer, MapOption);

  let imageSrc = 'https://cdn-icons-png.flaticon.com/512/5695/5695276.png',
    imageSize = new kakao.maps.Size(64, 69),
    imageOption = { offset: new kakao.maps.Point(27, 69) };

  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(y, x);

  let marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
  });
  marker.setMap(map);
}

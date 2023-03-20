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
              <div class="mat" id="map${data.id}">
                <img src="" >
              </div>
            </div>
          </div>
        </div>
        <div class="link">
          <a href="${data.url}" target="blank">More campsite information</a>
        </div>
        <div class="review">
          <h2>review <span>${data.review.length}</span></h2>
          <a href="" class="button">
            <div class="button__line"></div>
            <div class="button__line"></div>
            <span class="button__text" onclick="location.href='/review/reviewWrite'">write</span>
            <div class="button__drow1"></div>
            <div class="button__drow2"></div>
          </a>
        </div>
        `;
        $('.container').append(temp_html);

        let roadviewContainer = document.getElementById(`map${data.id}`);
        let roadview = new kakao.maps.Roadview(roadviewContainer);
        let roadviewClient = new kakao.maps.RoadviewClient();
        let position = new kakao.maps.LatLng(data.y, data.x);

        roadviewClient.getNearestPanoId(position, 50, function (panoId) {
          roadview.setPanoId(panoId, position);
        });

        res.data[0].review.forEach((data) => {
          const createdTime = new Date(data.createdAt);
          const year = createdTime.getFullYear();
          const month = createdTime.getMonth() + 1;
          const day = createdTime.getDate();
          const hour = createdTime.getHours();
          const minute = createdTime.getMinutes();

          let temp_html = `
        <div class="card" onclick="location.href=''">
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

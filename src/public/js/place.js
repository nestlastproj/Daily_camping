$(document).ready(function () {
  placeApidata();
});

function placeApidata() {
  axios({
    url: '/place/place',
    method: 'GET',
  })
    .then((res) => {
      res.data.forEach((data) => {
        let temp_html = `
        <div class="stack">
        <div class="card">
          <div class="image" id="map${data.id}">
          </div>
          <div class="text">
            <h3>${data.name}</h3>
            <h3>${data.address}</h3>
          </div>
          <div class="heart">
            <label class="like">
              <input type="checkbox" />
              <div class="hearth"></div>
            </label>
          </div>
        </div>
      </div>
      `;
        $('.container').append(temp_html);
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

            setTimeout(a, 10000);
          }
        });
      });
    })
    .catch((err) => {
      alert('캠핑장 정보 로드에 실패하였습니다.');
      console.log(err);
      // window.location.href = '/';
    });
}
// axios.post('review/review', { title, content }).then().catch();

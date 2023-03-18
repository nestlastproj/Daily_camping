$(document).ready(function () {
  const page = new URLSearchParams(location.search).get('page') || 1;
  placeApidata(page);
  // getlikecount()
});

function getlikecount() {
  axios({
    url: '/myplacelike',
    method: 'get',
  }).then((res) => {
    const data = res.data;
    for (let i in data) {
      let placeId = data[i].placelike_relationId;
      console.log(placeId);
    }
  });
}

function placeApidata(page) {
  axios({
    url: `/place/placeSearch?page=${page}&keyword=${keyword}`,
    method: 'GET',
  })
    .then((res) => {
      const { meta, placeList, like } = res.data;
      const { firstPage, lastPage, totalPage } = meta;

      placeList.forEach((data) => {
        let temp_html = `
                    <div class="stack">
                      <div class="card">
                        <div class="image" id="map${data.id}"></div>
                        <div class="text" onclick="window.open('${data.url}')" target="blank">
                          <h3>${data.name}<div class='count'>${data.like}</div></h3> 
                          <h3>${data.address}</h3>
                        </div>
                        <div class="heart">
                          <label class="like">
                            <input type="checkbox" />
                            <div class="hearth" onclick="like(${data.id})"></div>
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

            setTimeout(a, 100);
          }
        });
      });
      //------------------------

      // axios({
      //   url: '/allplacelike',
      //   method: 'get',
      // })
      //   .then((res) => {
      //     const data = res.data;
      //     console.log(data)
      //     for (let i in data) {
      //       let temp = `<div id="count">${data[i].count}</div> `;
      //       $('.count').append(temp)
      //     }
      //   })

      //------------------------
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

function like(id) {
  axios({
    url: `/place/${id}/like`,
    method: 'post',
  })
    .then((res) => {})
    .catch((err) => {
      console.log('error', err);
    });
}

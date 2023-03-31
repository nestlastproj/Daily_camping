$(document).ready(function () {
  axios
    .get('/auth/isLoggined')
    .then((res) => {
      let temp = `<a href="/auth/mypage">Mypage</a>`;
      $('.mypage').append(temp);
    })
    .catch((err) => {
      let temp = `<a href="/auth/login">Mypage</a>`;
      $('.mypage').append(temp);
    });

  $('#btnTwitter').click(function () {
    shareTwitter();
  });

  $('#btnFacebook').click(function () {
    shareFacebook();
  });

  shareKakao();
});

function shareTwitter() {
  var sendText = '내일 바로 캠핑';
  var sendUrl = 'https://sparta-hb.site/';
  window.open('https://twitter.com/intent/tweet?text=' + sendText + '&url=' + sendUrl);
}

function shareFacebook() {
  var sendUrl = 'https://sparta-hb.site/';
  window.open('http://www.facebook.com/sharer/sharer.php?u=' + sendUrl);
}

function shareKakao() {
  Kakao.init('7d8ec401d1c27908c267c4ff16af28f6');

  Kakao.Link.createDefaultButton({
    container: '#btnKakao',
    objectType: 'feed',
    content: {
      title: '내일 바로 캠핑',
      description: '내일 당장 캠핑을 떠나볼까요?',
      imageUrl: 'https://dailycampingbucket.s3.ap-northeast-2.amazonaws.com/dailycamping.png',
      link: {
        mobileWebUrl: 'https://sparta-hb.site/',
        webUrl: 'https://sparta-hb.site/',
      },
    },
  });
}

$(document).ready(function () {

    axios({
        method: 'get',
        url: '/auth/me',
    })
        .then((res) => {
            let { name, nickname, phone, image } = res.data
            document.getElementById('name').value = `${name}`
            document.getElementById('nickname').value = `${nickname}`
            document.getElementById('phone').value = `${phone}`
            if (image === null) {
                document.getElementById('image2').src = 'https://dailycampingbucket.s3.ap-northeast-2.amazonaws.com/83308917_1679321519298.jpg'
            } else {
                document.getElementById('image2').src = `https://dailycampingbucket.s3.ap-northeast-2.amazonaws.com/${image}`
            }

            $("input[type=file]").change(function (event) {
                let tmpPath = URL.createObjectURL(event.target.files[0]);
                $("#image2").attr("src", tmpPath);
            })
        })
        .catch((err) => {
            console.log(err, 'err')
        })
})
function updateprofile() {
    let name = document.getElementById('name').value
    let nickname = document.getElementById('nickname').value
    let phone = document.getElementById('phone').value
    let image = document.getElementById('image').files[0];

    const re_nickname = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
    const re_name = /^([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('phone', phone);
    formData.append('file', image);

    if (nickname.search(re_nickname) === -1) {
        alert('닉네임은 2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성 가능합니다.')
    } else if (name.search(re_name) === -1) {
        alert('이름은 2자 이상 10자 이하, 한글만 기재해주세요.')
    } else {
        axios.put(`/auth/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                axios.get('/auth/isLoggined').then(() => {
                    alert('수정 완료!');
                    window.location.reload();
                }).catch(() => {
                    alert('수정 완료! 다시 로그인 해주세요');
                    location.href = '/auth/login';
                })
            }).catch((error) => {
                alert(error.response.data.message);
                window.location.reload();
            })
    }
}


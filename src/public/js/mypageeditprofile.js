$(document).ready(function () {
    
    axios({
        method: 'get',
        url: '/auth/me',
    })
        .then((res) => {
            let { email, name, nickname, phone, image } = res.data
            document.getElementById('email').value = `${email}`
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
                console.log(tmpPath);
                $("#image2").attr("src", tmpPath);
            })
        })
        .catch((err) => {
            console.log(err, 'err')
        })
})
function updateprofile() {
    let email = document.getElementById('email').value
    let name = document.getElementById('name').value
    let nickname = document.getElementById('nickname').value
    let phone = document.getElementById('phone').value
    let image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('phone', phone);
    formData.append('file', image);

    axios.put(`/auth/edit`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => {
            alert('수정 완료!');
            window.location.replace(`/auth/login`);
        })
        .catch((err) => {
            console.log('error', err);
        })
}

 

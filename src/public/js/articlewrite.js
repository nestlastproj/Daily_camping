function finishwrite() {
    let title = document.getElementById('title').value
    let content = document.getElementById('content').value

    console.log(document.getElementsByClassName('note-icon-picture'), '1111111')
    let image = document.getElementsByClassName('note-icon-picture').files[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);

    axios.post('/article/go', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => {
            console.log(res);
            alert('게시 완료')
            // location.href = '/article/list'
        })
        .catch((err) => {
            console.log('error', err);
        })
}
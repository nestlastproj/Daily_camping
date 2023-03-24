function reviewWrite() {
    const placeIdUrl = window.location.pathname;
    const placeId = placeIdUrl.split('/')[3];

    let title = document.getElementById('title').value
    let content = document.getElementById('content').value
    let image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);

    axios.post(`/review/review/${placeId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => {
            alert('게시 완료')
            location.href = `/place/placeInfo?placeId=${placeId}`
        })
        .catch((err) => {
            alert(err.response.data.message);
        })
}
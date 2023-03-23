function articleWrite() {
  let title = document.getElementById('title').value
  let content = document.getElementById('content').value
  let image = document.getElementById('image').files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('file', image);

  axios.post('/article/write', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      alert('게시 완료')
      location.href = '/article/list'
    })
    .catch((err) => {
      alert(err.response.data.message);
    })
}

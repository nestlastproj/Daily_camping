$(document).ready(function () {
    axios({
        method: 'get',
        url: `/article/${articleId}`,
    })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err, 'err')
        })
})
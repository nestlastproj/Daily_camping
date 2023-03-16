// <% const token=document.cookie%>
//         <% console.log(token,'token') %>
//           <% if (!token) { %>
//             <button class="button-arounder">로그인</button>
//             <% } else { %>
//               <p><a href="">이름</a>님 <br>반갑습니다.</p>
//               <button class="button-arounder">로그아웃</button>
//               <% } %>
$(document).ready(function () {
    axios.get('/auth/isLoggined').then((res) => {
        console.log(res)
        let temp = `<p><a href="/auth/mypage">${res.data.nickname}</a>님 <br>반갑습니다.</p>
                    <button onclick="logout()" class="button-arounder">로그아웃</button>`
        $('.buttons-container').append(temp)

    }).catch((err) => {
        let temp = `<button onclick="location.href='/auth/login'" class="button-arounder">로그인</button>`
        $('.buttons-container').append(temp)

    })
})

function logout() {
    $.ajax({
        type: "post",
        url: "/auth/logout",
        data: {},
        success: function (response) {
            location.href = "http://localhost:3000/auth/login";
        },
        error: function (error) {
            console.log("에러이유:", error);
        },
    });
}
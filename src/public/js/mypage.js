$(document).ready(function () {
    const id = document.getElementsByClassName('gallery')[0].id;
    $.ajax({
        type: 'GET',
        url: `/auth/mypage/${id}`,
        success: function (response) {
            let tempHtml = ``;
            tempHtml += `<div class="profile">
                            <div class="profile-image">
                                <img src="${response.image}">
                            </div>

                            <div class="profile-user-settings">
                                <h1 class="profile-user-name">${response.nickname}</h1>
                                <div class="profile-edit-btn" onclick="/auth/edit">프로필 수정</div>
                            </div>

                            <div class="profile-stats">
                                <ul>
                                    <li><span class="profile-stat-count">게시글 </span>12</li>
                                    <li><span class="profile-stat-count">팔로잉 </span>10k</li>
                                    <li><span class="profile-stat-count">팔로워 </span>120k</li>
                                </ul>
                            </div>

                            <div class="profile-bio">
                                <p><span class="profile-real-name">--</p>
                            </div>
                        </div>
            `;
            $('#profile-header').append(tempHtml);
        }
    });
});

// 기본 이미지
// 
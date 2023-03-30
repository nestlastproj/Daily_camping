<p align="center">
  <a href="https://sparta-hb.site" target="blank"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxUEn6%2Fbtr6QSH2lUB%2FRI8ZiGaY23hF7f6Wyo1E01%2Fimg.png" alt="내바캠이미지" /></a>
</p>

## 캠핑 커뮤니티 사이트, 내일 바로 캠핑

캠핑장 & 캠핑 용품 & 캠핑 요리 레시피 등 모든 정보를 한눈에 볼 수 있는 커뮤니티 사이트입니다!

[내일 바로 캠핑 바로가기](https://sparta-hb.site)


## 목차

- 팀원 소개
- 서비스 아키텍처
- 설계
- 주요 기능
- 기술적 의사결정
- 트러블 슈팅
- 시연 영상 



## 팀원 소개

<table border="1">
	<th>역할</th>
	<th>이름</th>
  <th>contect</th>
	<tr><!-- 첫번째 줄 시작 -->
	    <td>리더</td>
	    <td>조해빈</td>
      <td>haebin1622@naver.com</td>
	</tr><!-- 첫번째 줄 끝 -->
	<tr><!-- 두번째 줄 시작 -->
	    <td>부리더</td>
	    <td>전규렬</td>
      <td>wjsrbfuf@gmail.com</td>
	</tr><!-- 두번째 줄 끝 -->
  <tr><!-- 첫번째 줄 시작 -->
	    <td>팀원</td>
	    <td>최원빈</td>
      <td>maraineryu@gmail.com</td>
	</tr><!-- 첫번째 줄 끝 -->
  <tr><!-- 첫번째 줄 시작 -->
	    <td>팀원</td>
	    <td>박예빈</td>
      <td>pros1313@hanmail.net</td>
	</tr><!-- 첫번째 줄 끝 -->
  <tr><!-- 첫번째 줄 시작 -->
	    <td>팀원</td>
	    <td>최환준</td>
      <td>nilee23@gmail.com</td>
	</tr><!-- 첫번째 줄 끝 -->
    </table>


## 서비스 아키텍처
<img src="(https://user-images.githubusercontent.com/118158809/228748895-13c93957-f049-4022-8a17-3767b6c710bd.png)">

<div align="center"><h1>📚 Tech Stack 📚</h1></div>
	<div align=center> 
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
	<img src="https://img.shields.io/badge/Nestjs-E0234E?style=flat&logo=Nestjs&logoColor=white" />
	<br>
	<img src="https://img.shields.io/badge/node.js-339933?style=flat&logo=Node.js&logoColor=white"> 
	<img src="https://img.shields.io/badge/Typeorm-E0234E?style=flat&logo=Nestjs&logoColor=white" /> 
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
	<img src="https://img.shields.io/badge/ECS-FF9900?style=flat&logo=ECS&logoColor=white" />
	<br>
	<img src="https://img.shields.io/badge/AXIOS-5A29E4?style=flat&logo=AXIOS&logoColor=white" />
	<img src="https://img.shields.io/badge/passport-34E27A?style=flat&logo=passport&logoColor=white" />
	<img src="https://img.shields.io/badge/Html5-E34F26?style=flat&logo=Html5&logoColor=white" />
	<img src="https://img.shields.io/badge/css-1572B6?style=flat&logo=css3&logoColor=white"> 
	<br>
	<img src="https://img.shields.io/badge/js-F7DF1E??style=flat&logo=js&logoColor=white">
	<img src="https://img.shields.io/badge/elasticsearch-005571??style=flat&logo=elasticsearch&logoColor=white">
	<img src="https://img.shields.io/badge/RDS-527FFF??style=flat&logo=RDS&logoColor=white">
	<br>
	<img src="https://img.shields.io/badge/puppeteer-40B5A4??style=flat&logo=puppeteer&logoColor=white">
	<img src="https://img.shields.io/badge/cheerio-008DB6??style=flat&logo=cheerio&logoColor=white">
</div>
<div align="center"><h1>🛠 Tools 🛠</h1></div>
	<div align=center> 
	<img src="https://img.shields.io/badge/git-F05032?style=flat&logo=git&logoColor=white">
	<img src="https://img.shields.io/badge/github-181717?style=flat&logo=github&logoColor=white">
	<img src="https://img.shields.io/badge/notion-000000?style=flat&logo=notion&logoColor=white">
	<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white">
	<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white">
</div>
    
 


## 설계


## 주요 기능
⭐ 통합 검색 기능
   ● 캠핑장, 캠핑 용품, 레시피, 게시글 전체 통합 검색 가능
<p align="center">
<img src=![Untitled](https://user-images.githubusercontent.com/118158809/228740305-04cf65a7-124f-4393-9156-25d6f028bccc.png)>
</p>


## 기술적 의사결정
<details>
	<summary>● elastic search cloud</summary>
	<li>
	기존에 like %% 연산로 검색기능을 구현하였으나 인덱싱을 하지 않는 문제로 속도가 느리거나 full scan이
        발생하는 문제가 확인되어 보다 검색기능을 강화 하고자 인덱스 검색 기능이 필요하다고 판단되어 elastic search를 도입하게 되었음.
	</li>
	</details>
	<details>
 	<summary> ● puppeteer</summary>
	<li>
	캠핑장 정보에서 캠핑장의 이미지를 출력하기를 원했지만 카카오 지도 api로 받아오는 데이터에는
	이미지가 없는 관계로 크롤링을 택하게 되었으며, 카카오 지도 페이지에서는  xmlHttpRequest 통신이
	막혀있는 문제가 확인되어 headless 라이브러리를 필요로 하게 되었으며 puppeteer는 Chrominum을
	작동하는 등 실제 브라우저 구성요소처럼 구성되어 있어 카카오 지도 페이지의 이미지 크롤링이
	가능하여 사용하게 됨
	</li>
	</details>
	<details>
	<summary>● 카카오 지도 api </summary>
	<li>
	캠핑장 장소에 대한 정보를 전달을 목표로 하고 있었으며, 여러가지(네이버,카카오 등..) 지도 api를
	비교해본 결과 카카오 지도 api가 내일바로캠핑 서비스에서
	필요로 하는 데이터를 전달해주기 때문에 카카오 지도 api를 사용하게 됨
	</li>
	</details>
	<details>
	<summary>● 11번가 api</summary>
	<li>
 	서비스 구상 중 캠핑 용품을 구매할 수 있는 서비스도 있으면 좋겠다는 의견이 반영되어 쇼핑몰 api를
	이용하기로 결정되어 네이버 쇼핑api, 쿠팡api, 11번가api 를 비교하게 되었으나 네이버 쇼핑 api와
	쿠팡 api는 사업자에게 제공되어 일반 유저도 사용할 수 있는 11번가 api를 채택하게 되었음
	</li>
	</details>
	<details>
	<summary>● cheerioi</summary>
	<li>
 	 레시피 정보는 만개의 레시피 사이트의 크롤링으로 결정되었으며 보다 효율적인 크롤링이 필요하여
	고민한 결과 원하는 정보만 가져올 수 있고 빠른 작동을 하는 cheerio 라이브러리를 사용하게 됨 
	</li>
	</details>
	<details>
	<summary>● scheduling</summary>
	<li>
  	주기적인 자동 크롤링 및 api 호출을 위하여 nestjs task scheduling  사용
	백엔드 서비스 api 서버와 결합도를 없애기 위해 추후 Cloudwatch (schedule) + lambda  이용해서 크롤링 하도록 변경 하는것을 계획중
	</li>
	</details>
	<details>
	<summary>●● passport</summary>
	<li>
  	회원가입과 로그인은 세션과 쿠키 처리 등 복잡한 작업이 많으므로 검증된 모듈을 사용하는 것이 좋기
	때문에 passport 모듈은 이에 적합하다 판단하여 사용하게 되었음
	</li>
	</details>
	<details>
	<summary>● jwt</summary>
	<li>
  	 사용자 인증에 필요한 모든 정보는 토큰 자체에 포함하기 때문에 별도의 인증 저장소가 필요하지 않아 jwt 를 사용하게 됨
	</li>
	</details>
	<details>
	<summary>● xml2js</summary>
	<li>
	 11번가 상품 api 요청 시 데이터 형식이 json이 아닌 xml 형태로 응답이 오는 문제로 인해 json 형태로
	변환하기 위해 xml2js 라이브러리를 사용하였으며 fast-xml-parser 라이브러리가 더 효율적인 사용이
	가능하다는 검색 결과가 있어 추후에 두 라이브러리를 비교하여 변경할 예정
	</li>
	</details>
	
 



## 트러블 슈팅


## 시연 영상

[시연 영상 바로가기](https://youtu.be/4yl8iTuKCN0)


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
<p align="center">
<img src="https://velog.velcdn.com/images/nilee23/post/01ae427b-7bce-4b7d-888d-841342749504/image.png" width="400" height="300"/>
</p>

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
	<br>
	<img src="https://img.shields.io/badge/js-F7DF1E??style=flat&logo=js&logoColor=white">
	<img src="https://img.shields.io/badge/elasticsearch-005571??style=flat&logo=elasticsearch&logoColor=white">
	<img src="https://img.shields.io/badge/RDS-527FFF??style=flat&logo=RDS&logoColor=white">
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
<details>
	<summary>ERD</summary>
	<img src="https://velog.velcdn.com/images/nilee23/post/d71f98e8-e2cc-4d84-9eee-d13278138ab7/image.png">
</details>


## 주요 기능
 <details>
	<summary>통합검색</summary>
	<p>캠핑장, 캠핑 용품, 레시피, 게시글 전체 통합 검색 가능</p>
<img src=https://velog.velcdn.com/images/nilee23/post/f5c216a0-6a93-41a6-a70e-14b9fc07f319/image.png>
</details>
 <details>
	<summary>좋아요캠핑장 뿐만 아니라 게시글, 댓글, 리뷰 까지 좋아요 가능 </summary>
<img src=https://velog.velcdn.com/images/nilee23/post/487bd002-0824-44a3-a80b-c43051cc83d4/image.png>
</details>
 커뮤니티
   <details>
	<summary>커뮤니티 게시글 및 댓글 작성, 좋아요 그리고 페이지네이션 기능을 구현</summary>
<img src=https://velog.velcdn.com/images/nilee23/post/ef8b64dc-1e6a-4b11-bc81-3f034d6172d1/image.png>
</details>  
  <details>
	<summary>레시피 캠핑 요리 검색 및 레시피 </summary>
<img src=https://velog.velcdn.com/images/nilee23/post/ff16ccfd-4ed2-4dd5-886e-7cb380b4f869/image.gif>
</details>
 마이페이지
   <details>
	<summary>마이페이지  회원 정보 수정: 이름, 전화번호, 닉네임, 프로필 이미지 수정
   본인이 작성한 게시글, 댓글, 후기 모아보기
   회원 탈퇴</summary>
<img src=https://velog.velcdn.com/images/nilee23/post/15015c42-1712-439e-bfd7-a7414259c2c4/image.gif>
</details>

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
## 📌  트러블 슈팅

- 캠핑장 검색 시 데이터가 많아 로드뷰에 과도한 로딩 시도
    - Elasticsearch 를 통함 검색 고도화
    
    ```
    문제 : 기존 like로 검색을 하게 되면 쿼리 증가로 인한 사이트 속도 저하 및 정확한 검색 결과 산출이 어려운 문제 발생
    
    과정 : 
    	-> 서비스는 각각의 도메인 (캠핑장 / 레시피 / 상품) 별 mysql table 이 나눠져 있음 
    	-> 3번의 쿼리가 필요함
    	-> like 검색으로 전방일지가 아닌 단어 포함으로 검색 할 경우 index 를 사용하지 않아 레이턴시가 길어짐
    
    결과 : 역인덱싱을 제공하는 es 를 통해 통합 검색을 구현하여 속도가 빨라짐
    ```
    
    - 페이지네이션을 통한 범위 데이터 서빙으로 용량을 줄여 레이턴시를 줄임
- 캠핑장 검색결과에 로드뷰가 아닌 캠핑장 이미지 삽입시도
    
    ```
    문제 : puppeteer 라이브러리로 요청 시도 하였으나 너무 대량의 요청이 발생하여 
    request limit over (이하 status 429) 발생
    
    과정 : 확인 결과 해당 api에서 분당 최대 200회 요청이 가능하며 200회 초과 시 status 429 발생
    
    결과 : 분당 200회 미만으로 요청하기 위해 크롤링 시 시간 설정을 하여 분당 120회 요청으로 변경
    ```
    
    ```
    문제 : 카카오 지도 api를 이용해 캠핑장 정보를 받아오는 과정에서 이미지를 제공하지 않는 문제 발생
    
    과정 :
    			-> 이미지 크롤링을 시도하였으나 axios get 요청 시 xhr 통신이 막혀 ssl 인증 에러 발생
    			-> curl 라이브러리로 재시도 하였으나 동일한 에러 발생
    			-> 로컬 환경에서 테스트 하기 위해 로컬에서 작동 가능한 라이브러리를 검색
    			-> puppeteer 라이브러리로 요청 시 이미지 크롤링 가능
    
    결과 : 하지만 puppeteer 라이브러리로 시도 시 이미지 크롤링 속도가 과하게 느린 문제가 확인되어
    			추가 문제 해결 방법 고민 상태임
    ```
    
- Api 스케줄러로 주기적으로 실행시, 변함 없는 데이터는 그대로 유지 변화가 생긴 데이터는 delete 메소드로 db를 비우고 실행
    
    ```
    문제 : api 호출시 insert 메소드로 인해서 기존에 데이터가 존재하더라도 중복 입력되는 문제 발생 
    
    과정 : 
    			-> delete 메소드로 데이터 삭제 후 insert를 진행하였으나 불필요한 삭제가 일어남
    			-> 변경이 없는 데이터는 삭제할 필요가 없다고 판단, On duplicate key update를 적용
    
    결과 : 이미 가져온 데이터 중 변경되지 않는 데이터는 더이상 요청하지 않도록 구현 계획 중
    ```
    
- 회원 탈퇴
    
    ```
    문제 : 회원 탈퇴 버튼을 누르면 너무 쉽게 회원 탈퇴가 되어 당황을 했다는 사용자 피드백
    
    과정 :
    		-> 회원 탈퇴 시 프론트에서 bcrypt 처리 된 유저의 비밀번호를 불러와 현재 입력된 비밀번호를 암호화 시켜 
    			서로 일치하면 회원 탈퇴를 진행하도록 처리 시도
    		-> 프론트에서 위와 같은 처리를 하게 되면 암호화 로직이 공개적으로 보여지기에 백에서 처리하도록 시도
    
    결과 : 백에서 현재 입력된 비밀번호와 db에서 불러온 유저의 비밀번호를 대조하여 일치하면 회원 탈퇴를 진행
    ```
    
    ```
    문제 : 회원 탈퇴 진행 시 조인 했을 때 실제 사용자가 없기 때문에 게시물 조회 실패
    
    과정 : 
    		-> 회원 탈퇴 시 탈퇴한 유저가 작성한 게시글, 댓글, 리뷰와 좋아요 까지 모두 delete 되도록 구현하였으나
    			사이트 목적인 소통, 즉 커뮤니티의 기능이 상실된다고 판단
    		-> 탈퇴한 사용자를 delete -> softdelete 처리
    		-> 게시물 조회 시, typeorm 특성 상 기본적으로 delete_at = null 조건을 추가함
    
    결과 : typeorm 기능 중 withDeleted = true 옵션을 사용하여 삭제된 유저정보도 join 되도록 함
    ```
    
- frontend에서의 페이지네이션
    
    ```
    문제 : 모든 게시글을 select하여 frontend로 전달 후 페이지네이션을 구현하였으나 2페이지 선택 부터는 빨랐으나
    			첫페이지에서 모든 게시글을 가져오기에 성능이 떨어져 속도가 저하됨
    
    과정 : 
    		-> backend에서 findAndCount 함수를 통해 한 페이지에 가져올 데이터의 제한 갯수와 
    				이전 요청의 데이터 갯수를 계산하는 페이지네이션을 구현
    		-> 계산된 값으로 select 해서 가져오는 값의 범위를 축소시킴
    
    결과 : backend에서 구현한 페이지네이션을 적용한 결과, 속도가 향상되었음
    ```
    
- 좋아요 / 댓글 카운트
    
    ```
    문제 : 초반에는 update 문을 사용하여 like + 1로 구현을 하였으나
    			많은 사용자 부하테스트 결과 count를 제대로 인식하지 못하는 현상이 발생함  
    			 => 동시성 문제
    
    결과 : typeorm의 createselectquery를 사용하여 좋아요 / 댓글 갯수를 세는 카운트를 구현
    ```
    
- 비로그인 유저
    
    ```
    문제 : 비로그인 시 게시글, 리뷰 작성 시 글쓰기는 가능하지만 저장을 눌렀을 때 undefind 가 뜬다는 사용자 피드백
    
    과정 : backend에서 UseGuards를 활용하여 user정보를 반환하도록 설계
    
    결과 : 비로그인 시 axios get을 통해 유저 정보가 없을 시 로그인 페이지로 이동하게 구현
    ```
    
- 검색 기능 like `%${검색어}%`로 기능 구현하여 불필요한 정보가 불러와짐
    
    ```
    문제 : like `%${검색어}%`을 이용하여 검색 기능 구현을 시도 하였으나 불필요한 정보가 불러와짐
    
    결과 : elasticsearch, kibana 도입으로 보다 빠르고 완벽한 검색 기능 구현
    ```
    
- elastic search → elastic search cloud로 변경
    
    ```
    문제 : elastic search 도입하였으나 서버 사양 부족으로 로컬 elastic search 구현 불가
    
    과정 :
    		-> opensearch 를 사용하려 시도하였으나 비용적인 문제가 발생
    			 (상용 프로젝트일 경우 opensearch 가 효율적이라고 판단됨)
    		-> elastic search cloud 14일간 무료 평가판 제공됨
    
    결과 : elastic search cloud 로 변경하여 서버의 부담을 없앰    
    ```
    

## 시연 영상

[시연 영상 바로가기](https://youtu.be/4yl8iTuKCN0)


//DOM 구조 생성
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const newsList = document.querySelector('.news-lists');

//form 검색 인식하면 이벤트 실행
searchForm.addEventListener('submit', retrieve);
function retrieve(e){
    //form submit 기본 전송기능(action) 막기
    e.preventDefault();

    let topic = searchInput.value;
    const apiKey = "2721d1f0de38415b978ddeed5ff2291a";
    let url=`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
    
    //검색내용 없을 때는 alert창 띄우기
    if(topic == ""){
        alert('먼저 검색어를 입력해주시죨.');
        return;
    }

    //news-list의 내용값 비우기(기존 검색된 li 모두 제거)
    newsList.innerHTML="";

    //newsApi에서 가져온 정보로 DOM에 출력
    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data);
        data.articles.forEach(article=>{
            /* 각 뉴스 */
            //li.news
            let li = document.createElement('li');
            li.className = "news";
            //li.news>a
            let a = document.createElement('a');
            a.setAttribute('href',article.url);
            a.setAttribute('target','_blank');
            // a.textContent=article.title;

            /* 뉴스 썸네일 */
            //div.news-thumbnail
            let thumbnail = document.createElement('div');
            thumbnail.className = "news-thumbnail";
            //div.news-thumbnail>img
            let thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('src', article.urlToImage)

            /* 뉴스 내용 */
            //div.news-contents
            let contents = document.createElement('div');
            contents.className = "news-contents";

            /* 뉴슥 내용 - 작가 , 날짜 */
            //div.news-info
            let newsInfo = document.createElement('div');
            newsInfo.className = "news-info";
            //span.news-author 작가
            let author = document.createElement('span');
            author.className = "news-author";
            author.textContent=article.author;
            //span.news-date 날짜
            let date = document.createElement('span');
            date.className = "news-date";
            date.textContent=article.publishedAt;

            /* 뉴슥 내용 - 제목 */
            //div.news-title
            let title = document.createElement('p');
            title.className = "news-title";
            title.textContent=article.title;

            /* 뉴슥 내용 - 설명글 */
            //div.news-description
            let description = document.createElement('p');
            description.className = "news-description";
            description.textContent=article.description;

            //만든 DOM요소들 부모에 넣기
            newsList.appendChild(li);
            li.appendChild(a);

            a.appendChild(thumbnail);
            thumbnail.append(thumbnailImg);

            a.appendChild(contents);
            contents.appendChild(newsInfo);
            newsInfo.appendChild(author);
            newsInfo.appendChild(date);
            contents.appendChild(title);
            contents.appendChild(description);
        })

        //관련 뉴스 없을 때 
        let totalResults = data.totalResults;
        console.log(totalResults);
        if(totalResults == '0'){
            console.log('없');
            let noResullt = document.createElement('strong');
            noResullt.className = "noResult";
            noResullt.textContent="아이쿠 아무런 기사가 없네요ㅠㅠ";
            newsList.appendChild(noResullt);
        }
    }).catch((error)=>{console.log('error')});
    
    console.log(topic);
  
}
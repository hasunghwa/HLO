window.addEventListener("wheel", function(e){
  e.preventDefault();
},{passive : false});

var mHtml = $("html");
var page = 1;
mHtml.animate({scrollTop : 0},10);

let pageChange = (page => {
  mHtml.animate({scrollTop : (page) * $(window).height()});
});

$(window).on("wheel", function(e) {
  if(mHtml.is(":animated")) return;
  if(e.originalEvent.deltaY > 0) {
      if(page == 6) return;
      if(page != 1)
        document.getElementById(`btn${page-1}`).innerHTML="○";
      page++;
      document.getElementById(`btn${page-1}`).innerHTML="●";
  } else if(e.originalEvent.deltaY < 0) {
      if(page == 1) return;
      document.getElementById(`btn${page-1}`).innerHTML="○";
      page--;
      if(page != 1)
        document.getElementById(`btn${page-1}`).innerHTML="●";
  }
  if(page !== 1){
    document.getElementById('pagination').style.display="inline";
  } else {
    document.getElementById('pagination').style.display="none";
  }
  pageChange(page-1);
})

let selectPage = document.querySelectorAll(".selectPage");
selectPage.forEach(btn => {
  btn.addEventListener("click", function(e) {
    pageChange(e.target.dataset.value);
    document.getElementById(`btn${page-1}`).innerHTML="○";
    document.getElementById(e.target.id).innerHTML="●";
    page = Number(e.target.dataset.value) + 1;
  });
});

let nCnt = 0;	
async function asyncHello() {
  return new Promise(resolve => setTimeout(() => { 
    if(nCnt%3 == 0){
      document.getElementById('section3').style.backgroundColor = "pink";
    } else {
      document.getElementById('section3').style.backgroundColor = "#eff4ff";
    }
    nCnt++;
    if(nCnt == 2){
      document.getElementById(`character_1`).classList.remove('current');
      document.getElementById(`character_2`).className += ' current';
    } else if(nCnt == 4){
      document.getElementById(`character_2`).classList.remove('current');
      document.getElementById(`character_3`).className += ' current';
    } else if(nCnt == 6){
      document.getElementById(`character_3`).classList.remove('current');
      document.getElementById(`character_1`).className += ' current';
    } 
    if(nCnt === 7){
      nCnt = 1;
      document.getElementById(`screen_6`).classList.remove('current');
      document.getElementById(`screen_1`).className += ' current';
    }
    if(nCnt!= 1 && nCnt < 7){
      document.getElementById(`screen_${nCnt-1}`).classList.remove('current');
      document.getElementById(`screen_${nCnt}`).className += ' current';
    } 
    asyncHello();
  }, 2000))
}
async function main() {
  const promises = [];
  for (var i = 0; i < 10; i++) {
    promises.push(asyncHello(i));
  }
  await Promise.all(promises);
}

function startAnimation()
{
  obTimeOut = window.setTimeout(asyncHello,100); // 윈도우 로드 후 0.1초 후에 반복함수를 호출합니다.
}
window.onload = startAnimation;

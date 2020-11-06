//Timer 설정 시작
var tid; //setInterval() 함수의 레퍼런스, clearInterval() 호출시 사용
var cnt = parseInt(10);//세션시간 설정(단위:초), 이 예제는 10초
var logoutInfo_url; //자동 로그아웃 안내페이지 호출 url
		
function counter_init(logoutInfoUrl) { //메인화면 세션 카운트 실행
	logoutInfo_url = logoutInfoUrl;
	tid = setInterval("counter_run()", 1000); //1초에 반번씩 'counter_run()' 함수 호출
}
		
function counter_run() { //메인화면 세션 카운트 함수
	document.all.counter.innerText = time_format(cnt);
	cnt--;
	if(cnt < 0) {
		clearInterval(tid);
		/*세션연장 여부를 질의하는 팝업을 띄운다.*/
		open_window();
		/*팝업에서 다시 카운트 시작*/
		cnt = parseInt(10);//카운트 초기화(초단위)
		nCounter_init();
	}
}
		
function nCounter_init() { //팝업화면 추가 세션 카운트 실행
	tid = setInterval("nCounter_run()", 1000);
}

function nCounter_run() { //팝업화면 추가 세션 카운트 함수
	document.all.ncounter.innerText = time_format(cnt);
	cnt--;
	if(cnt < 0) {
		/*추가 세션 카운트가 0이면 로그아웃 후 자동로그아웃 안내화면으로 이동*/
		logoutInfo();
	}
}
				
function counter_reset() { //메인화면 카운트 재시작 및 서버 세션 연장
	//(1) WAS session 연장을 위해 WAS의 dummy 페이지 호출
	// => WAS 호출로직 추가!
	
	//(2) 세견 카운트 초기화
	clearInterval(tid);
	cnt = parseInt(10);//초기값(초단위)
	counter_init();//메인화면 세션 카운트 실행
	
	//(3) 팝업화면 추가 세션 카운트도 초기화
	document.all.ncounter.innerText = ""; 
}
		
function logoutInfo() { //로그아웃 후 자동로그아웃 안내화면으로 이동
	self.location = "${rootPath}/nav/sessionQuestion";
}
		
function logout(logoutUrl) { //로그아웃 후 로그인화면으로 이동 
	self.location = "${rootPath}/nav/logout";
	
}
//Timer 설정 끝

//Layer Popup 설정 시작
function open_window(){
	var popup = document.getElementById("popup");
	popup.style.display = "block"; //block을 생성해서 보이게한다.
	//popup.style.visibility = "visible"; --> 이미 생성된 영역의 visible 기능만 On 한 경우
}

function close_window(){
	var popup = document.getElementById("popup");
	popup.style.display = "none"; //해당 영역을 지워서 않보이게 한다.
	//popup.style.visibility = "hidden"; --> 해당 영역을 렌더링한 상태에서 visible 기능만 Off 한 경우
}
//Layer Popup 설정 끝

//시간 포멧 설정 함수
function time_format(s) {
	var nHour=0;
	var nMin=0;
	var nSec=0;
	if(s>0) {
		nMin = parseInt(s/60);
		nSec = s%60;

		if(nMin>60) {
			nHour = parseInt(nMin/60);
			nMin = nMin%60;
		}
	} 
	
	if(nSec<10) nSec = "0"+nSec;
	
	if(nMin<10) nMin = "0"+nMin;
		return ""+nHour+":"+nMin+":"+nSec;
	}
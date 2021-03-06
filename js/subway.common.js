/**
 * 공통 스크립트
 */
(function($){
	/*====================================================================================
    ' 함수명 : $.fn.showBlockMask(msg)
    ' 인  수 : msg - 로딩 메세지
    ' 기  능 : 특정 Element 마스크 처리 및 로딩문구 노출
    ' 리턴값 : 없음.
    '=====================================================================================*/
	$.fn.showBlockMask = function(msg){
		$(this).block({
            message: (msg == "" || msg == undefined) ? "Please Wait..." : msg,
            css: {
                border: 'none',
                padding: '15px',
                //backgroundColor: '#eee',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: 5,
                color: '#000'
            },
            overlayCSS: {
                backgroundColor: '#a7a7a7',
                opacity: 0.6,
                cursor: 'wait'
            }
        });
	},
	/*====================================================================================
    ' 함수명 :$.fn.hideBlockMask(msg)
    ' 인  수 : msg - 완료 메세지
    ' 기  능 : 특정 Element 마스크 해제 처리
    ' 리턴값 : 없음.
     '=====================================================================================*/
	$.fn.hideBlockMask = function(msg){
		if (msg == "" || msg == undefined) {
            $(this).unblock();
        }
        else {
            $(this).unblock({
                onUnblock: function () {
                    alert(msg);
                }
            });
        }
	},
	 /*====================================================================================
    ' 함수명 : $.showMask(msg)
    ' 인  수 : msg - 로딩 메세지
    ' 기  능 : 페이지 마스크 처리 및 로딩문구 노출
    ' 리턴값 : 없음.
    '=====================================================================================*/
	$.showMask = function(msg){
		$.blockUI({
            message: (msg == "" || msg == undefined) ? "Please Wait..." : msg,
            css: {
                border: 'none',
                padding: '15px',
                //backgroundColor: '#ff0000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: 5,
                color: '#000',
                zIndex: 99999999999999
            },
            overlayCSS: {
            	backgroundColor: '#a7a7a7',
                opacity: 0.6,
                cursor: 'wait',
                zIndex: 99999999999000
            }
        });
	},
	/*====================================================================================
    ' 함수명 : $.hideMask(msg)
    ' 인  수 : msg - 완료 메세지
    ' 기  능 : 페이지 마스크 제거
    ' 리턴값 : 없음.
    '=====================================================================================*/
	$.hideMask = function(msg){
		if (msg == "" || msg == undefined) {
            //setTimeout($.unblockUI(), 9000);
            $.unblockUI();
        }
        else {
            $.unblockUI({
                onUnblock: function () {
                    alert(msg);
                }
            });
        }
	},
	/*=======================================================================================
    ' 함수명 : $.fn.checkEmail()
    ' 인  수 : Email - 이메일주소
    ' 기  능 : 이메일 체크
    ' 리턴값 : true/false
    '======================================================================================*/
	$.fn.checkEmail = function(){
		var reg = new RegExp("^[\\w\\-]+(\\.[\\w\\-_]+)*@[\\w\\-]+(\\.[\\w\\-]+)*(\\.[a-zA-Z]{2,3})$", "gi");
    	if (!reg.test(this.val())) {
    		return false;
    	}
    	else {
    		return true;
    	}
	},
	/*====================================================================================
    ' 함수명 : $.fn.pager(obj)
    ' 인  수 : obj.size   - 페이지 사이즈
    '          obj - obj.page  		: page no
    '          obj - obj.pageCount  : total count
    '          obj - obj.size  		: pageSize
    '          obj - obj.fun  		: function
    ' 기  능 :  페이지 네비게이션 생성처리
    ' 리턴값
    '=====================================================================================*/
	$.fn.pager = function(obj){

	},
	/*====================================================================================
    ' 함수명 : $.post(url, reqMethod, param, successfn, failFn)
    ' 인  수 : url   - 호출 주소
    '        reqMethod - post, get
    '        param  - parameter 값 (Json)
    '        successfn : 처리 성공시 호출 함수
    '        failFn    : 실패시 호출 함수
    ' 기  능 :  Ajax 처리
    ' 리턴값
    '=====================================================================================*/
	$.post = function(url, reqMethod, param, successfn, failFn){
		var method = (reqMethod == null || reqMethod == undefined || reqMethod == "") ? "POST" : reqMethod;

		$.ajax({
	        type: method,
	        url: url,
	        data : param,
	        dataType: "json",
	        beforeSend: function(xhr) {
	        	xhr.setRequestHeader("Accept", "application/json");
	        	xhr.setRequestHeader("Content-Type", "application/json");
	        },
	        cache: false,
	        success: function (data) {
	        	successfn(data);
	        },
	        error: function (xhr, ajaxOptions, thrownError) {
	        	if (failFn == null || failFn == undefined || failFn == "") {
	        		alert("error" + thrownError);
	        	} else {
	        		failFn("error" + thrownError);
	        	}
	        }
		});
	},
	/*====================================================================================
    ' 함수명 : $.fn.pass()
    ' 기  능  :  비밀번호 유혀성 검사
    ' 리턴값 : 0 - 사용가능 , 1 - 자리수 미달 , 2 - 영문.숫자,특수문자 조합 오류
    '=====================================================================================*/
	$.fn.pass = function(){
		var regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,20}/;

		if(!regex.test(this.val())) {
			return false;
		}

		return true;
	}

	/*====================================================================================
    ' 함수명 : $.fn.getDateByjQueryDateFormat
    ' 기  능  :  query datepicker의 y m d 형식의 문자열로 날짜 구하기
    ' @param value jquery datepicker의 "-1y +1m +2d" 형식
    '=====================================================================================*/
	$.fn.getDateByjQueryDateFormat = function (value, baseDate) {
		var today = new Date();
		if(baseDate != null && typeof(baseDate) === 'object')
			today = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
		//alert("today : " + today);
		var elements = value.toString().split(' ');
		for(var x in elements) {
			var num = eval(elements[x].substr(0, elements[x].length - 1).toString());
			var flag = elements[x].substr(elements[x].length -1).toString().toLowerCase();
			if(flag == 'd')
				today.setDate(today.getDate() + num);
			else if(flag == 'm')
				today.setMonth(today.getMonth() + num);
			else if(flag == 'y')
				today.setFullYear(today.getFullYear() + num);
		}
		return today;
	}

	/*=========================
	' 함수명 : $fn.getyyyyMMdd
    ' 기  능  : 날짜 객체를 yyyy-MM-dd 형식으로 가져옴
    ' 구분자 : 기본값 (-)
	==========================*/
	$.fn.getyyyyMMdd = function (dataObject, separator) {
		if( separator == null)
			separator = '-';

		var str = null;
		var month = dataObject.getMonth() + 1;
		var day = dataObject.getDate();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		str = dataObject.getFullYear() + separator + month + separator + day;
		return str;
	}
})(jQuery);



var subwayCommon = {
	copyToClipboard: function(textData, targetObj) {

		/*
		//  Dialog를 사용하는 방법
		var IE = (document.all) ? true : false;
		if (IE) {
			if(confirm("주소를 클립보드에 복사하시겠습니까?"))
				window.clipboardData.setData("Text", textData);
		}
		else {
			temp = prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", textData);
		}
		*/

		//  임의의 Element를 사용하는 방법
		var tempDiv = document.createElement('div');
		tempDiv.contentEditable = true;
		document.body.appendChild(tempDiv);

		tempDiv.innerHTML = textData;
		tempDiv.unselectable = "off";
		tempDiv.focus();

		document.execCommand('SelectAll');
		document.execCommand("Copy", false, null);
		document.body.removeChild(tempDiv);

		//  tempDiv로 이동된 포커스를 다시 가져온다.
		targetObj.focus();
		targetObj.blur();

		alert("주소가 복사되었습니다.");
	},
	shareToFacebook: function(url) {
		var popup = "http://www.facebook.com/sharer/sharer.php?u="
					+ encodeURIComponent(url);
		window.open(popup);
	},
	shareToKakao: function(containerId, label, imgSrc, url) {

		if (waffle.isMobile() == false) {
			document.getElementById("ui_kakao_btn").style.display = "none";
		}

		Kakao.init('247d92c0db39275acffc54aade477142');
		Kakao.Link.createTalkLinkButton({
			container: "#" + containerId,
			label: label,
			image: {
				src: imgSrc,
				width: '300',
				height: '200'
				},
			webButton: {
				text: '써브웨이',
				url: url
				}
		});
	},
	inputOnlyDigit: function(obj) {
		obj.value = obj.value.replace(/[^0-9-]/g, '');
	},
	inputEmail: function(obj) {
		obj.value = obj.value.replace(/[^0-9a-zA-Z_.@\-]/g, '');
	},
	escapeHtml: function(unsafe) {
	    return unsafe
	         .replace(/&/g, "&amp;")
	         .replace(/</g, "&lt;")
	         .replace(/>/g, "&gt;")
	         .replace(/"/g, "&quot;")
	         .replace(/'/g, "&#039;")
	         .replace(/[?]/g, "&#63;");
	 }
};

// 메뉴소개 하위 추천 소스가 있을 경우 문구 추가 처리 _by ahn.180322
$(document).ready(function(){
	var isRecommand = $(".recipe div").hasClass("rec");
	if(isRecommand){
		var str = '<p class="not">* 매장에 따라 추천소스는 상이할 수 있습니다.</p>';
		$(".recipe").parent().append(str);
	}
});

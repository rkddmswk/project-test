$(document).ready(function(){

	// 레이어 팝업 닫기 클릭 시
	$(".js-layer-closer").on("click", function(){
		$(this).closest(".layer-popup").toggleClass("layer-hide layer-show");
	});

	// 헤더 메뉴 열기 클릭 시
	$(".js-open-header-nav").on("click", function(){
		if ($(".header-nav").hasClass("header-nav-open")==false && $(".header-nav").hasClass("header-nav-close")==false ) {
			$(".header-nav").addClass("header-nav-open");
		} else {
			$(".header-nav").toggleClass("header-nav-open header-nav-close");
		}
	});
});

//공백제거함수
function trim(value) {
	return value.replace(/ /g, '');
}

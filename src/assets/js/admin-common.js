$(document).ready(function(){

	// .layer-popup 안에서 제거 클릭 시
	$(document).on("click", ".js-layer-popup-remove", function(){
		$(this).closest(".layer-popup").remove();
	});

	// .layer-popup 안에서 숨기기 클릭 시
	$(document).on("click", ".js-layer-popup-hide", function(){
		$(this).closest(".layer-popup").toggleClass("layer-hide layer-show");
	});

});

//팝업창 닫기
function layerPopupClose(id) {
	$(id).closest(".layer-popup").remove();
}

//공백제거함수
function trim(value) {
	return value.replace(/ /g, '');
}


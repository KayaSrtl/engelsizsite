var window_height, window_width;
var ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;


$( document ).ready(function() {
	var url = window.location.href;
	var search_header_text = "Arama: ";
	
	for(var i = 0; i < url.length; i++)
		if(url)
		search_header_text += "sonuc";
	
	
	
	$( "#search_name_header" ).text(search_header_text);
	
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	setTimeout(function() { beReadyPage();}, 1000);
});


$(document).keydown(function(e){
	
	
});




$(window).scroll(function(event){
	
	
	
	
});


function beReadyPage () {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
}




$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	return;
});

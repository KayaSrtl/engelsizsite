var window_height, window_width;
var ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;


$( document ).ready(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	setTimeout(function() { beReadyPage();}, 1000);
});


$(document).keydown(function(e){
	//e.preventDefault();
	
	//alert(e.keyCode);
	
	if(e.keyCode == 13)
		goResultPage();
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


function goResultPage() {
	//var url = window.location.href;
	var searchtemp = $( "#search_bar_submit" ).first().val();
	if(!searchtemp)
		return;
	url = "./other_pages/searchres.html?Search=";
	for(var i = 0; i < searchtemp.length; i++)
		if(searchtemp[i] == " ")
			url += "+";
		else
			url += searchtemp[i];
	//url += $( "#search_bar_submit" ).first().val();
	//alert(url);
	window.location.href = url;
}

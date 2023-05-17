var window_height, window_width;
var ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
var selected_book_index = 1;

var last_book_index = 10;
var search_header_text;

var Turkish_codes = ["%C3%A7", "%C3%87", "%C3%B6", "%C3%96", "%C5%9F", "%C5%9E", "%C4%B1", "%C4%B0", "%C4%9F", "%C4%9E", "%C3%BC", "%C3%9C"];
var Turkish_chars = ["ç", "Ç", "ö", "Ö", "ş", "Ş", "ı", "İ", "ğ", "Ğ", "ü", "Ü"];


//import data from '../panel/panelsayfasi/data.json' assert { type: 'json' };
//console.log(data);

//../panel/panelsayfasi/data.json




/*fetch('https://raw.githubusercontent.com/KayaSrtl/engelsizsite/main/panel/panelsayfasi/data.json')
    .then((response) => response.json())
    .then((json) => console.log(json[0]));*/

	fetch('https://raw.githubusercontent.com/KayaSrtl/engelsizsite/main/panel/panelsayfasi/data.json')
  .then(response => response.json())
  .then(myObj => {
	var objlen;
	//console.log(myObj[1].name);
	objlen = Object.keys(myObj).length;
	console.log(objlen);
	var itemcounter = 0, is_pickable = false;
	index = 0;
	console.log(myObj[1].name);
	for(var i = 0; i < objlen; i++) {
		
			if(search_header_text == myObj[i].name) {
				itemcounter++;
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_name" ).text(myObj[i].name);
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_writer" ).text(myObj[i].writer);
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_language" ).text(myObj[i].language);
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_format" ).text(myObj[i].format);
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_subject" ).text(myObj[i].subject);
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_link" ).text(myObj[i].link);
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_link" ).attr("href", myObj[i].link);
				
				if(itemcounter > 1) {
					$( ".search_result_div_outer" ).clone().appendTo( ".result_show_inner" ).prop('id', 'search_result_' + itemcounter);
				}
			}
		if(itemcounter == 1) {
			$(".search_result_div_outer").css('display', 'flex');
			$(".book_not_found_txt").css('display', 'none');
		}
	}
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });



$( document ).ready(function() {
	
	var url = window.location.href;
	
	//url = encodeURIComponent(url);
	var index;
	for(index = 0; index < url.length; index++)
		if(url[index] == '?')
			break;
		
	
	index += 8;
	if(url[index] != "%") {
		search_header_text = url[index];
		index++;
	} else {
		for(var i = 0; i < Turkish_codes.length; i++) {
				if(url.slice(index, index+6) == Turkish_codes[i]) {
					search_header_text = Turkish_chars[i];
					index += 6;
					break;
				}
			}
	}
	while(index < url.length) {
		if(url[index] == "%") {
			for(var i = 0; i < Turkish_codes.length; i++) {
				//console.log(url.slice(index, index+6) + " " + Turkish_codes[i]);
				if(url.slice(index, index+6) == Turkish_codes[i]) {
					search_header_text += Turkish_chars[i];
					index += 6;
					break;
				}
			}
		} else if (url[index] == "+") {
			search_header_text += " ";
			index++;
		}
		else {
			search_header_text += url[index];
			index++;
		}
		
	}
	console.log(search_header_text);
	
	
	
	
	//%C3%A7%C3%87%C3%B6%C3%96%C5%9F%C5%9E%C4%B1%C4%B0%C4%9F%C4%9E%C3%BC%C3%9C
	//çÇöÖşŞıİğĞüÜ
	
	//search_header_text = "ç";
	
	
	
	
	/*$.getJSON( "https://raw.githubusercontent.com/KayaSrtl/engelsizsite/main/panel/panelsayfasi/data.json", function( data ) {
  var items = [];
  var itemcounter = 0, is_pickable = false;
  index = 0;
  $.each( data, function( key, val ) {
	  console.log(key);
	  
		if(key == "name")
			if(search_header_text == val) {
				itemcounter++;
				is_pickable = true;
				if(itemcounter > 1) {
					$( ".search_result_div_outer" ).clone().appendTo( ".result_show_inner" ).prop('id', 'search_result_' + itemcounter);
				}
				
			} else {
				is_pickable = false;
			}
		if(itemcounter == 1) {
			$(".search_result_div_outer").css('display', 'flex');
			$(".book_not_found_txt").css('display', 'none');
		}
		
		if(is_pickable) {
			if(key == "name")
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_name" ).text(val);
			if(key == "writer")
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_writer" ).text(val);
			if(key == "language")
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_language" ).text(val);
			if(key == "format")
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_format" ).text(val);
			if(key == "subject")
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_subject" ).text(val);
			if(key == "link")
				$('#search_result_' + (itemcounter - 1)).children( ".search_result_div" ).children( ".literature_link" ).text(val);
			
			
		}
		//console.log(key + " " + val);
		items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
}); */
	
	$( "#search_name_header" ).text("Arama Sonucu: " + search_header_text);
	
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	setTimeout(function() { beReadyPage();}, 1000);
});


$(document).keydown(function(e){
	//e.preventDefault();
	
	if(e.keyCode == 39)
		selected_book_index++;
	
	if(e.keyCode == 40)
		selected_book_index--;

	if(selected_book_index > last_book_index)
		selected_book_index = 1;
	
	if(selected_book_index <= 0)
		selected_book_index = last_book_index;
	
	
	//console.log(selected_book_index);
});




$(window).scroll(function(event){
	
	
	
	
});


function beReadyPage () {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
	
	if(parseInt($( ".result_show_outer" ).height()) < window_height)
		$(".copy_write").css('position', 'fixed');
	else
		$(".copy_write").css('position', 'relative');
}




$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	return;
});

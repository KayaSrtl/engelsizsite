var window_height, window_width;
var ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
var selected_book_index = 1;

var last_book_index = 10;
var search_header_text = [];

var Turkish_codes = ["%C3%A7", "%C3%87", "%C3%B6", "%C3%96", "%C5%9F", "%C5%9E", "%C4%B1", "%C4%B0", "%C4%9F", "%C4%9E", "%C3%BC", "%C3%9C", "%27", "%3C", "%3E", "%C2%A3", "%C2%BD", "%C3%A9"];
var Turkish_chars = ["ç", "Ç", "ö", "Ö", "ş", "Ş", "ı", "İ", "ğ", "Ğ", "ü", "Ü", "'", "<", ">", "£", "½", "é"];


//import data from '../panel/panelsayfasi/data.json' assert { type: 'json' };
//console.log(data);

//../panel/panelsayfasi/data.json


var stringsToSearch = [
  "JavaScript Basics",
  "Advanced JavaScript Techniques",
  "Introduction to JavaScript",
  "JavaScript for Web Development",
  "JavaScript Frameworks andweb Libraries"
];



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
	var strings_for_search = [];
	var strings_for_search_temp;
	
	
	for(var i = 0; i < objlen; i++) {
		strings_for_search_temp = myObj[i].name;
		strings_for_search_temp += myObj[i].writer;
		strings_for_search_temp += myObj[i].language;
		strings_for_search_temp += myObj[i].format;
		strings_for_search_temp += myObj[i].subject;
		strings_for_search.push(strings_for_search_temp);
	}
	
	
	var searchResultsIndex = searchString(search_header_text, strings_for_search);
	/*console.log("Search Results:");
	for (var i = 0; i < searchResultsIndex.length; i++) {
		console.log(searchResultsIndex[i]);
	}*/
	
	
	for(var i = 0; i < searchResultsIndex.length; i++) {
		if(i >= 1) {
			$( ".search_result_div_outer" ).clone().appendTo( ".result_show_inner" ).prop('id', 'search_result_' + i);
		}
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_name" ).text(myObj[searchResultsIndex[i]].name);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_writer" ).text(myObj[searchResultsIndex[i]].writer);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_language" ).text(myObj[searchResultsIndex[i]].language);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_format" ).text(myObj[searchResultsIndex[i]].format);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_subject" ).text(myObj[searchResultsIndex[i]].subject);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_link" ).text(myObj[searchResultsIndex[i]].link);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".literature_link" ).attr("href", myObj[searchResultsIndex[i]].link);
		
		
	}
	
	if(searchResultsIndex.length) {
		$(".search_result_div_outer").css('display', 'flex');
		$(".book_not_found_txt").css('display', 'none');
	} else {
		$(".book_not_found_txt").text("Aranan Kitap Bulunamadı!");
	}
	
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });


function searchString(searchTerm, strings) {
  var results = [];
  for (var i = 0; i < strings.length; i++) {
    if (strings[i].toLowerCase().includes(searchTerm.toLowerCase())) {
      results.push(i);
    }
  }
  return results;
}



$( document ).ready(function() {
	
	var url = window.location.href;
	
	//url = encodeURIComponent(url);
	var index;
	for(index = 0; index < url.length; index++)
		if(url[index] == '?')
			break;
		
	
	index += 8;
	console.log(url);
	
	while(index < url.length) {
		if(url[index] == "%") {
			var isout = false;
			for(var i = 0; i < Turkish_codes.length; i++) {
				//console.log(url.slice(index, index+6) + " " + Turkish_codes[i]);
				if(url.slice(index, index+Turkish_codes[i].length) == Turkish_codes[i]) {
					search_header_text += Turkish_chars[i];
					index += Turkish_codes[i].length;
					isout = true;
					break;
				}
				
			}
			
			if(!isout)
					index++;
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

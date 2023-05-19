var window_height, window_width;
var ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
var selected_book_index = 1;

var last_book_index = 10;
var search_header_text = [];

var Turkish_codes = ["%C3%A7", "%C3%87", "%C3%B6", "%C3%96", "%C5%9F", "%C5%9E", "%C4%B1", "%C4%B0", "%C4%9F", "%C4%9E", "%C3%BC", "%C3%9C", "%27", "%3C", "%3E", "%C2%A3", "%C2%BD", "%C3%A9"];
var Turkish_chars = ["ç", "Ç", "ö", "Ö", "ş", "Ş", "ı", "İ", "ğ", "Ğ", "ü", "Ü", "'", "<", ">", "£", "½", "é"];

var usernames = [];
var passwords = [];
//import data from 'https://raw.githubusercontent.com/KayaSrtl/engelsizsite/main/panel/panelsayfasi/data.json' assert { type: 'json' };
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
	//var objlen;
	//console.log(myObj[1].name);
	//objlen = Object.keys(myObj).length;
	//console.log(objlen);
	//console.log(myObj[1].name);
	$(".excel_text_header").text("Dosya İndirilmeye Hazır.");
	ExportData(myObj);
	
	
	$('.download').click();
	setTimeout(window.top.close, 2000);
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });


	
	
$(function() {
    $('.download').on('click', function(e) {
        //e.preventDefault();
        $('.loading').show();
        url = $('.download').attr('href') + '?cmd=prepare';
        $.ajax({
            url: url,
            type: 'get',
            success: function(filename) {
                console.log(data);
                window.location = filename;
                window.top.close();
            }
        });
    });
});  


$( document ).ready(function() {
	
	$("#logout").click(function(){
			location.replace("../../panelgiris.html");
		});
	

	
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	setTimeout(function() { beReadyPage();}, 1000);
});


$(document).keydown(function(e){
	//console.log(e.keyCode);
});




$(window).scroll(function(event){
	
	
	
	
});


function beReadyPage () {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
}

function ExportData(data)
    {
            filename='output.xlsx';
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "People");
        XLSX.writeFile(wb,filename);
     }


$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	return;
});
var window_height, window_width;
var ismenuopen = false;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
var selected_book_index = 1;

var last_book_index = 10;
var search_header_text = [];

var Turkish_codes = ["%C3%A7", "%C3%87", "%C3%B6", "%C3%96", "%C5%9F", "%C5%9E", "%C4%B1", "%C4%B0", "%C4%9F", "%C4%9E", "%C3%BC", "%C3%9C", "%27", "%3C", "%3E", "%C2%A3", "%C2%BD", "%C3%A9"];
var Turkish_chars = ["ç", "Ç", "ö", "Ö", "ş", "Ş", "ı", "İ", "ğ", "Ğ", "ü", "Ü", "'", "<", ">", "£", "½", "é"];

const key = "Z2hwX1UwcTRPR2xWbGtZcmsyQnNZYndHWnhJSVczRVBhcDBkVXpEaQ==";


var globeOBJ;
var objlen;
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

	fetch('https://raw.githubusercontent.com/eylulberil/websitedata/main/users.json')
  .then(response => response.json())
  .then(myObj => {
	
	//console.log(myObj[1].name);
	objlen = Object.keys(myObj).length;
	globeOBJ = myObj;
	console.log(objlen);
	var itemcounter = 0, is_pickable = false;
	index = 0;
	console.log(myObj[1].username);
	var strings_for_search = [];
	var strings_for_search_temp;
	
	
	var searchResultsIndex = [];
	var searchResultsSimilartyVal = [];
	

//console.log("After sorting:", searchResultsSimilartyVal);
//console.log("After sorting:", searchResultsIndex	);
	
	//console.log(searchString2("JavaSript", stringsToSearch[0]));
	
	
	
	/*console.log("Search Results:");
	for (var i = 0; i < searchResultsIndex.length; i++) {
		console.log(searchResultsIndex[i]);
	}*/
	
	
	for(var i = 0; i < objlen; i++) {
		if(i > 0) {
			$( '#search_result_' + (i - 1)).clone().appendTo( ".result_show_inner" ).prop('id', 'search_result_' + i);
		}
		$('#search_result_' + i).children( ".search_result_div" ).children( ".user_username" ).text(myObj[i].username);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".user_password" ).text(myObj[i].password);
		$('#search_result_' + i).children( ".search_result_div" ).children( ".user_permission_degree" ).text(myObj[i].permission);
		
		
	}
	
	
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
  });


function addNewUser() {

	if(objlen) {
		$( '#search_result_' + (objlen - 1)).clone().appendTo( ".result_show_inner" ).prop('id', 'search_result_' + objlen);

	} 
		$(".search_result_div_outer").css("display", "flex");
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_username" ).attr('contenteditable','true');;
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_username" ).text("EDIT username");
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_password" ).attr('contenteditable','true');;
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_password" ).text("EDIT password");
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_permission_degree" ).attr('contenteditable','true');;
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_permission_degree" ).text("EDIT permission");
	$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_edit" ).children( ".edit_user_button" ).text("Düzenlemeyi Bitir.");
		objlen++;
}




function searchString2(searchTerm, strings) {
  var results = [];
    if (strings.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
  }
  return false;
}

function searchString(searchTerm, searchString) {
  var options = {
    keys: ['title'], // Specify the key(s) to search in the objects
    includeScore: true, // Include the search score in the results
    threshold: 0.4, // Set the fuzzy search threshold (0.0 - 1.0)
  };

  var fuse = new Fuse([{ title: searchString }], options); // Convert the searchString into an array of objects with a 'title' key
  var results = fuse.search(searchTerm);

  if (results.length > 0) {
    return {
      found: true,
      score: results[0].score
    };
  } else {
    return {
      found: false,
      score: null
    };
  }
}

function updatelocalJSON(json_object) {
	var json_temp = {
                "username": "value1",
                "password": "value2",
                "permission": "value3"
            };
	console.log(json_object);
	if(Object.keys(json_object).length > objlen) {
		/*for(var i = Object.keys(json_object).length - 1; i >= objlen; i--) {
			//delete json_object[i];
			json_object.splice(i, 1);
		}*/
json_object.splice(objlen, Object.keys(json_object).length-objlen);
	} else {
		for(var i = Object.keys(json_object).length; i < objlen; i++) 
			json_object.push(json_temp);
	}

	console.log(json_object);
	for(var i = 0; i < objlen; i++) {
		json_object[i].username = $('#search_result_' + i).children( ".search_result_div" ).children( ".user_username" ).text();
		json_object[i].password = $('#search_result_' + i).children( ".search_result_div" ).children( ".user_password" ).text();
		json_object[i].permission = $('#search_result_' + i).children( ".search_result_div" ).children( ".user_permission_degree" ).text();
		
		//globeOBJ[i] = json_temp;
		//console.log(json_object);
		//console.log($('#search_result_' + i).children( ".search_result_div" ).children( ".user_username" ).text());
		
	}
	
	return json_object;
}

function submitUpdates() {
	globeOBJ = updatelocalJSON(globeOBJ);
	
	
	console.log(globeOBJ);
	uploadJSON(globeOBJ);
}


function sortMirrorArr(arr, mirror_arr) {
  var len = arr.length;
  var swapped;

  do {
    swapped = false;
    for (var i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        var temp = arr[i];
        var temp_mirr = mirror_arr[i];
        arr[i] = arr[i + 1];
        mirror_arr[i] = mirror_arr[i + 1];
        arr[i + 1] = temp;
        mirror_arr[i + 1] = temp_mirr;
        swapped = true;
      }
    }
  } while (swapped);

  return temp_mirr;
}

var textstrtemp;

$( document ).ready(function() {
	
	
	$(".logout").click(function(){
		location.replace("../../panelgiris.html");
	});

	$(".remove_edit_button").click(function(){
	    var value = $('#editablediv').attr('contenteditable');

		if (value == 'false') {
			$('#editablediv').attr('contenteditable','true');
		}
		else {
			$('#editablediv').attr('contenteditable','false');
		}
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_username" ).attr('contenteditable','true');
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_password" ).attr('contenteditable','true');
		$('#search_result_' + objlen).children( ".search_result_div" ).children( ".user_permission_degree" ).attr('contenteditable','true');
	});
	
	
	$(document).on("focusin", ".editable_info", function (ev) {
		textstrtemp = $(this).text();
		$(this).text("");
	});
	
	$(document).on("focusout", ".editable_info", function (ev) {
		if($(this).text() == "")
			$(this).text(textstrtemp);
	});
	
	$(document).on("click", ".edit_user_button", function (ev) {
		if($(this).text() == "Düzenle") {
			$(this).text("Düzenlemeyi Bitir.");
			$(this).parent(".user_edit").parent(".search_result_div").children( ".user_username" ).attr('contenteditable','true');
			$(this).parent(".user_edit").parent(".search_result_div").children( ".user_password" ).attr('contenteditable','true');
			$(this).parent(".user_edit").parent(".search_result_div").children( ".user_permission_degree" ).attr('contenteditable','true');
		} else {
			$(this).text("Düzenle");
			$(this).parent(".user_edit").parent(".search_result_div").children( ".user_username" ).attr('contenteditable','false');
			$(this).parent(".user_edit").parent(".search_result_div").children( ".user_password" ).attr('contenteditable','false');
			$(this).parent(".user_edit").parent(".search_result_div").children( ".user_permission_degree" ).attr('contenteditable','false');
		}
	});
	
	$(document).on("click", ".remove_user_button", function (ev) {
		var id = $(this).parent(".user_edit").parent(".search_result_div").parent(".search_result_div_outer").attr('id');
		//console.log(id.slice(14, 15));
		if(objlen > 1) {
			$(this).parent(".user_edit").parent(".search_result_div").parent(".search_result_div_outer").remove();
			objlen--;
		} else if(objlen == 1) {
			$(this).parent(".user_edit").parent(".search_result_div").parent(".search_result_div_outer").css("display", "none");
			objlen--;
		}
		
		for(var i = parseInt(id.slice(14, 15)) + 1; i <= objlen; i++) {
			$( '#search_result_' + i).prop('id', 'search_result_' + (i - 1));
			//console.log(i);
		}
		
	});
	
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
	
	if(parseInt($( ".result_show_outer" ).height()) > window_height)
		$(".copy_write").css('position', 'fixed');
	else
		$(".copy_write").css('position', 'relative');
}




$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	return;
});


function decodeString(encodedStr) {
  return atob(encodedStr);
}


function uploadJSON(json_object) {
  // Update the data as desired
  /*const updatedData = {
    someKey: 'çok seviyorum'
  };*/

  //const token = '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';
  var token = decodeString(key);
  const repoOwner = 'eylulberil';
  const repoName = 'websitedata';
  const filePath = './users.json';

  // Convert the updated data to JSON
  const updatedJsonData = JSON.stringify(json_object, null, 2);

  // Fetch the current file details, including SHA
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch file details');
      }
    })
    .then((fileData) => {
      const currentSHA = fileData.sha;

      // Remove backslashes before quotes
      const contentWithoutBackslashes = updatedJsonData.replace(/\\/g, '').replace(/^"(.*)"$/, '$1');

      // Encode the JSON data to base64
      const encoder = new TextEncoder();
      const data = encoder.encode(contentWithoutBackslashes);
      const contentBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));

      // Make an HTTP request to update the file
      return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update JSON file',
          content: contentBase64,
          sha: currentSHA
        })
      });
    })
    .then((response) => {
      if (response.ok) {
        console.log('JSON file updated successfully');
      } else {
        throw new Error('Failed to update JSON file');
      }
    })
    .catch((error) => {
      console.error('Error updating JSON file:', error.message);
    });
}



/*function encodeString(str) {
  return btoa(str);
}*/
  
  

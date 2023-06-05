var window_height, window_width;
var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
var selected_book_index = 1;

var json_object;
var is_upload_ready = false;
const key = "Z2hwX0dNNXdGdFhYWUlZR2tjOHlPOVZWamloSVJNdjhsZzRKdWQ5Rw==";


  var ExcelToJSON = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          json_object = JSON.stringify(XL_row_object);
          //console.log(JSON.parse(json_object));
		  //console.log(json_object);
          //jQuery('#xlx_json').val(json_object);
			
		  //uploadJson(0);
			is_upload_ready = true;
        })
      };

      reader.onerror = function(ex) {
        console.log(ex);
      };

      reader.readAsBinaryString(file);
    };
  };

  function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
  }
  
    function handleDrop2(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
	  
	  
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
    }


function uploadJson() {
	if(is_upload_ready) {
		console.log(json_object);
		uploadJSON(json_object);
	} else {
		console.log("öncelikle dosya yükleyin.");
	}
	
	//deleteFile();
	
	/*setTimeout(function() {
    
}, 500);*/
	//uploadJSON();
}

/*var encodedString = encodeString(myString);
console.log(encodedString);


encodedString = decodeString(encodedString);

console.log(encodedString);

function encodeString(str) {
  return btoa(str);
}*/
  
  
function decodeString(encodedStr) {
  return atob(encodedStr);
}
  
$( document ).ready(function() {
	
	$("#logout").click(function(){
			location.replace("../panelgiris.html");
		});
	
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.getElementById('drop-zone').addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });

      // Highlight the drop zone when a file is dragged over it
      ['dragenter', 'dragover'].forEach(eventName => {
        document.getElementById('drop-zone').addEventListener(eventName, highlight, false);
      });

      // Remove the highlighting when a file is dragged out of the drop zone
      ['dragleave', 'drop'].forEach(eventName => {
        document.getElementById('drop-zone').addEventListener(eventName, unhighlight, false);
      });

      // Handle dropped files
      document.getElementById('drop-zone').addEventListener('drop', handleDrop, false);
	//document.getElementById('drop-zone').addEventListener('drop', handleDrop2, false);

	
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	setTimeout(function() { beReadyPage();}, 1000);
});


    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function highlight() {
      document.getElementById('drop-zone').style.backgroundColor = '#e1e7f0';
      document.getElementById('drop-zone').style.color = '#111';
    }

    function unhighlight() {
      document.getElementById('drop-zone').style.backgroundColor = '';
      document.getElementById('drop-zone').style.color = '';
    }

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;

      handleFiles(files);
    }

	
	
function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      var headers = jsonData[0];
      var result = [];

      for (var row = 1; row < jsonData.length; row++) {
        var obj = {};
        for (var col = 0; col < headers.length; col++) {
          obj[headers[col]] = jsonData[row][col];
        }
        result.push(obj);
      }
		json_object = JSON.stringify(result);
     // uploadJson(json_object);
		is_upload_ready = true;
      // Here, you can perform further actions with the modified JSON data, such as sending it to a server or processing it in some way.
    };

    reader.readAsArrayBuffer(file);
  }
}


$(document).keydown(function(e){
	//e.preventDefault();
	if(e.keyCode == 13) {
		$("#upload").click();
	}
	//console.log(e.keyCode);
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


//json_object

     // Function to fetch the existing file content
	 
function uploadJSON(json_object) {
  // Update the data as desired
  /*const updatedData = {
    someKey: 'çok seviyorum'
  };*/

  //const token = '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';
  var token = decodeString(key);
  const repoOwner = 'eylulberil';
  const repoName = 'websitedata';
  const filePath = './data.json';

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




var token = decodeString(key);
  const repoOwner = 'eylulberil';
  const repoName = 'websitedata';
  const filePath = './data.json';


// API endpoint for deleting a file
const deleteFileEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

async function getFileSHA() {
  try {
    const response = await fetch(deleteFileEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GetFileSHA'
      }
    });

    if (response.ok) {
      const fileData = await response.json();
      return fileData.sha;
    } else {
      throw new Error(`Error getting file SHA: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Delete file function
async function deleteFile() {
  try {
    const fileSHA = await getFileSHA();

    const response = await fetch(deleteFileEndpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DeleteFile'
      },
      body: JSON.stringify({
        message: 'Delete file',
        sha: fileSHA
      })
    });

    if (response.ok) {
      console.log('File deleted successfully');
    } else {
      const errorData = await response.json();
      throw new Error(`Error deleting file: ${errorData.message}`);
    }
  } catch (error) {
    console.error(error);
  }
}

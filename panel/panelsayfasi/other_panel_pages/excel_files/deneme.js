function uploadJSON() {
// Update the data as desired
const updatedData = {
  someKey: 'çok seviyorum'
};

const token = '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';
const repoOwner = 'KayaSrtl';
const repoName = 'engelsizsite';
const filePath = 'deneme/denemee.json';

// Convert the updated data to JSON
const updatedJsonData = JSON.stringify(updatedData, null, 2);

// Make an HTTP request to update the file
fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Update JSON file',
    content: btoa(updatedJsonData),
    sha: 'OPTIONAL_SHA', // If you have the current SHA, provide it here to ensure atomic update
  })
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


//

function uploadJSON(json_object) {
  // Update the data as desired
  /*const updatedData = {
    someKey: 'çok seviyorum'
  };*/

  const token = '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';
  const repoOwner = 'KayaSrtl';
  const repoName = 'engelsizsite';
  const filePath = 'deneme/denemee.json';

  // Convert the updated data to JSON
//const updatedJsonData = JSON.stringify(updatedData, null, 2);
const updatedJsonData = JSON.stringify(json_object, null, 2);

  // Encode the JSON data to base64
  const encoder = new TextEncoder();
  const contentBase64 = btoa(encoder.encode(updatedJsonData));

  // Make an HTTP request to update the file
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Update JSON file',
      content: contentBase64,
      sha: 'OPTIONAL_SHA', // If you have the current SHA, provide it here to ensure atomic update
    })
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


function uploadJSON(json_object) {
  // Update the data as desired

  const token = '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';
  const repoOwner = 'KayaSrtl';
  const repoName = 'engelsizsite';
  const filePath = 'deneme/denemee.json';

  // Convert the updated data to JSON
//const updatedJsonData = JSON.stringify(updatedData, null, 2);
const updatedJsonData = JSON.stringify(json_object, null, 2);

  // Encode the JSON data to base64
  const encoder = new TextEncoder();
  const data = encoder.encode(updatedJsonData);
  const contentBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));

  // Make an HTTP request to update the file
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Update JSON file',
      content: contentBase64,
      sha: 'OPTIONAL_SHA', // If you have the current SHA, provide it here to ensure atomic update
    })
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



function uploadJSON() {
  // Update the data as desired
  const updatedData = {
    someKey: 'çok seviyorum'
  };

  const token = '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';
  const repoOwner = 'KayaSrtl';
  const repoName = 'engelsizsite';
  const filePath = 'deneme/denemee.json';

  // Convert the updated data to JSON
  const updatedJsonData = JSON.stringify(updatedData, null, 2);

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

      // Encode the JSON data to base64
      const encoder = new TextEncoder();
      const data = encoder.encode(updatedJsonData);
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


function uploadJSON(json_object) {
  // Update the data as desired
  /*const updatedData = {
    someKey: 'çok seviyorum'
  };*/

  const token = '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';
  const repoOwner = 'KayaSrtl';
  const repoName = 'engelsizsite';
  const filePath = 'deneme/denemee.json';

  // Convert the updated data to JSON
  //const updatedJsonData = JSON.stringify(updatedData, null, 2);
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

      // Encode the JSON data to base64
      const encoder = new TextEncoder();
      const data = encoder.encode(updatedJsonData);
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



function uploadJSON() {
  // Update the data as desired
  const updatedData = {
    someKey: 'çok seviyorum'
  };

  const token = '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';
  const repoOwner = 'KayaSrtl';
  const repoName = 'engelsizsite';
  const filePath = 'deneme/denemee.json';

  // Convert the updated data to JSON
  const updatedJsonData = JSON.stringify(updatedData, null, 2);

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

      // Encode the JSON data to base64
      const encoder = new TextEncoder();
      const data = encoder.encode(updatedJsonData.replace(/\//g, '\\/'));
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

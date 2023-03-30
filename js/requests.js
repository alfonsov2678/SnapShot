document.getElementById("displaytext").style.display = "none";

function searchPhoto() {
  var apigClient = apigClientFactory.newClient({
    apiKey: "AdEUPD6WIx9RHuqRD7upJ6gQcJQTUpfq1TQl7BL3",
  });

  var user_message = document.getElementById("note-textarea").value;

  var body = { q: user_message };
  var params = { q: user_message };
  console.log(params);
  var additionalParams = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  apigClient.searchGet(params, body, additionalParams).then(function (result) {
      const gallery = document.getElementById("gallery");
      console.log("Response:", result.data);
      gallery.innerHTML = "";

      result.data.results.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        gallery.appendChild(img);
      });
    })
    .catch(function (result) {
      console.log("error");
    });
}

function getBase64Two(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}



function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    return reader.result
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

async function uploadPhoto() {
  var apigClient = apigClientFactory.newClient({
    apiKey: "AdEUPD6WIx9RHuqRD7upJ6gQcJQTUpfq1TQl7BL3",
  });


  const params = {
    "x-amz-meta-customLabels": [""],
    "filename": "fox.jpg",
  };

  var file = document.getElementById("file_path");


  var file = getBase64Two(file.files[0]).then((result => {
    console.log("RESULT")
    console.log(result);

    const formData = new FormData();
    formData.append("file", result);
  
    console.log("Example Upload: ", {
      method: "PUT",
      body: result,
      headers: params
    });
  
    var additionalParams = {};
  

    apigClient.uploadFilenamePut(params, result, additionalParams).then(function (response) {
      console.log("RUNNING")
      if (response.status === 200) {
        alert("Photo uploaded successfully!");
      } else {
        alert("Failed to upload the photo");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
  }));

  /*
  
    const reader = new FileReader();
 
    var file_data;
    var encoded_image = getBase64(file).then(
      data => {
      console.log(data)
      var apigClient = apigClientFactory.newClient({
                        apiKey: "AdEUPD6WIx9RHuqRD7upJ6gQcJQTUpfq1TQl7BL3"
           });
 
      var file_type = file.type + ";base64"
     
      var body = data;
      var params = {"key" : file.name, "Content-Type" : "image/jpg"};
      var additionalParams = {};
      apigClient.uploadFilenamePut(params, body , additionalParams).then(function(res){
        if (res.status == 200)
        {
          document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!"
          document.getElementById("uploadText").style.display = "block";
        }
      })
    
    });
*/


}

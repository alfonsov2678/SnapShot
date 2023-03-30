$(function () {
    $('#search_form').on('submit', function (e)  {
        e.preventDefault();  //prevent form from submitting
        console.log("Search button clicked");
        query = $('#search-phrase').val();
        console.log("Search query from text box: ", query);
        send_request(query)
    });
});



var apigClient = apigClientFactory.newClient();

function send_request(query) {
    console.log("running")
    query = "Maradona"
    $.ajax({
        method: 'GET',
        url: 'https://7zwchfpu65.execute-api.us-east-1.amazonaws.com/prod/search?q=' + query,
        success: function (res) {
            console.log(res);
            if(res.indexOf("There were no photos matching the categories you were looking for.") >= 0){
                $('#results').html(res).css("color", "red");
            }
            else {
                $('#results').html("");
                $.each(res, function (index, value) {
                    console.log("i:" + index + " val:" + value);
                    $('#results').prepend($('<img>',{id:'theImg'+index,src:value,style:'width:500px;'}))
                });
            }
        },
        error: function (err) {
            let message_obj = JSON.parse(err.responseText);
            let message = message_obj.message.content;
            $('#results').html('Error:' + message).css("color", "red");
            console.log(err);
        }
    });
}

function showImage(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
};


$(document).ready(function () {
    $("#upload-btn").click(function () {
        // var fd = new FormData();
        var files = $('#file_path')[0].files[0];
        // fd.append('file',files);
        // console.log(fd)
        console.log(files)
        console.log(files.type)
        console.log(files.name)
        let config = {
            headers: { 'Content-Type': files.type, "X-Api-Key": "AdEUPD6WIx9RHuqRD7upJ6gQcJQTUpfq1TQl7BL3", }
        };
        url = 'https://er6b5c9yd9.execute-api.us-east-1.amazonaws.com/prod/upload/%7BFILENAME%7D' + files.name
        axios.put(url, files, config).then(response => {
            // console.log(response.data)
            alert("Image uploaded successfully!");
        })
    });
});

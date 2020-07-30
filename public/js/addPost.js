const ENV_HOST =  'http://'+window.location.hostname+':4000';
var current_image = null;
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            current_image = e.target.result;
            $('#your_image').attr('src', e.target.result).attr('height', 200).attr('width', 200);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function addPost(){
    //window.alert("POST ADDED");
    var content = document.getElementById("postContent").value.toString();

    console.log($('#uploaded_image')[0].files[0]);
    var formdata = new FormData();
    formdata.append('post_image', $('#uploaded_image')[0].files[0]);
    formdata.append('post_content', $('#postContent').val().toString());

    add_to_db(formdata, $('#postContent').val().toString());
    
    //if(content != ""){
    // var image = document.getElementById("uploaded_image").value;
    // var file = uploadImage(image);
    // console.log(content);
    // add_to_db(content, current_image);
    //}
}

// async function uploadImage(image){
//     await $.ajax({
//         type: 'POST',
//         dataType: "multipart/form-data",
//         data: image,
//         url: ENV_HOST + 'api/posts/upload_image',
//         success: function(data){
//             return data.filePath;
//         }
//     })
// }


function add_to_db(formdata, content){

    var d = new Date();
    var month = d.getMonth() + 1;
    var mins = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
    var hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
    var date = hours + ':' + mins + ' ' + d.getDate() + '-' + month  + '-' + d.getFullYear();

    $.ajax({
        type: 'POST',
        url: ENV_HOST + '/api/posts/' + content + '/' + date,
        contentType: false,
        processData: false,
        cache: false,
        data: formdata,
        success: function(data){
            
            //window.alert("Data Inserted");
            window.open("http://localhost:4000/",'_self');
            //getData();
        }
    });
}
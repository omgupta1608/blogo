const ENV_HOST =  'http://'+window.location.hostname+':4000';

function addPost(){
    //window.alert("POST ADDED");
    var content = document.getElementById("postContent").innerHTML;
    //if(content != ""){
        add_to_db(content);
    //}
}

function add_to_db(content){

    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getHours() + ':' + d.getMinutes() + ' ' + d.getDate() + '-' + month  + '-' + d.getFullYear();

    $.ajax({
        type: 'POST',
        url: ENV_HOST + '/api/posts/' + content + '/' + date,
        dataType: "json",
        success: function(data){
            
            //window.alert("Data Inserted");
            window.open("http://localhost:4000/",'_self');
            //getData();
        }
    });
}
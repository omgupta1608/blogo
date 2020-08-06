const ENV_HOST =  'http://'+window.location.hostname+':4000';

function login(){
    var username = $("#username").val().toString();
    var password = $("#password").val().toString();

    $.ajax({
        url: ENV_HOST + '/api/users/' + username + '/' + password + '/login',
        type: 'POST',
        success: function(data){
            console.log(data.toString());
            Materialize.toast(data.toString());
            $("#username").val("");
            $("#password").val("");
            switch(data.toString()){
                case "email & password are required":
                    //Materialize.toast('Email & Password are required');
                    Materialize.toast(data.toString());
                    break;
                case "Successfully Logged In":
                    //Materialize.toast('Successfully Logged In');
                    Materialize.toast(data.toString());
                    break;
                case "Wrong Credentials!":
                    Materialize.toast(data.toString());
                    break;
                case "Server Error!":
                    //Materialize.toast('Something went wrong!');
                    Materialize.toast(data.toString());
                    break;
            }
        }
    });
}
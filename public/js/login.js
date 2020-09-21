const ENV_HOST =  'https://'+window.location.hostname+':4000';
localStorage.clear();
function login(){
    var username = $("#username").val().toString();
    var password = $("#password").val().toString();

    $.ajax({
        url: ENV_HOST + '/api/users/' + username + '/' + password + '/login',
        type: 'POST',
        success: function(data){
            console.log(data);
            Materialize.toast(data.message.toString());
            
            setTimeout(() => {
                if(data.message.includes("Successfully")){
                    window.open('http://localhost:4000/homepage', '_self');
                }
            },1000);
            
        }
    });
}
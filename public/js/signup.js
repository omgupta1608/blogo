const ENV_HOST =  'http://'+window.location.hostname+':4000';

function signup(){
    var username = $("#username").val().toString();
    var password = $("#password").val().toString();

    $.ajax({
        url: ENV_HOST + '/api/users/' + username + '/' + password + '/signup',
        type: 'POST',
        success: function(data){
            console.log(data.toString());
            Materialize.toast(data.toString());

            setTimeout(() => {
            	if(data.includes("Welcome")){
                	window.open('http://localhost:4000/homepage', '_self');
            	}
            },1000);
            
            
        }
    });
}
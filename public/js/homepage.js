const ENV_HOST = 'http://' + window.location.hostname + ':4000';
var localStorage = null;
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: ENV_HOST + '/api/posts/all_posts',
        headers: {"Authorization": localStorage.getItem('accessToken')},
        success: function (data) {
            console.log(data);
            document.getElementById("loading").style.display = 'none';
            data.reverse();
            $.each(data, function (index, element) {

                //var markup = '<h6>' + element.content + '<br> Likes : ' + element.likes_count + '<br> Posted On : ' + element.date_time + '<br><br>';
                var post = '<div class="card" style="width: 30%; margin-top: 20px; margin-left: 30px"><div class="card-header">' + element._id + '</div><div class="post-body"><img src="http://localhost:4000/uploads/' + element.imageUrl + '" alt="post image" class="img-fluid" style="height:20rem; width: 28rem;"><h5 class="post-content" style="margin-top: 5px;">' + element.content + '</h5><p class="post-date" style="color: gray;">' + element.date + '</p><button type="button" id="' + element._id + '" onclick="like_post(this)" style="margin-bottom: 10px" class="btn btn-outline-danger">Like</button></div></div>';
                $('#posts').append(post);
                //$('#data_table').append($('<tr>').append($('<td>').text(element.password)));
            });

        }
    });

function like_post(ele){
    var id = ele.id;

    var form = new FormData();
    form.append('id', id);
console.log(id);
    $.ajax({
        type: 'POST',
        data: form,
        contentType: false,
        processData: false,
        cache: false,
        url: ENV_HOST + '/api/posts/' + id + '/like_post',
        success: function(data){
            console.log(data);
            ele.style.display = 'none';
        }
    });
}




{/* <div class="card" style="width: 28rem; margin-top: 20px;">
    <div class="card-header">'+element.post_id + '</div>
    <div class="post-body">
        <h5 class="post-content" style="margin-top: 5px;">' + element.content + '</h5>
        <p class="post-date" style="color: gray;">' + element.date_time + '</p>
        <button type="button" id="' + element.post_id + ' " class="btn btn-outline-danger">Like</button>
        <h5 class="post-likes">' + element.likes_count + '</h5>
    </div>
</div> */}

const ENV_HOST =  'http://'+window.location.hostname+':4000';

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: ENV_HOST + '/api/posts/all_posts',
        success: function(data){
            console.log(data);
            $.each(data, function(index, element) {
                    
                //var markup = '<h6>' + element.content + '<br> Likes : ' + element.likes_count + '<br> Posted On : ' + element.date_time + '<br><br>';
                var post = '<div class="card" style="width: 30%; margin-top: 20px; margin-left: 30px"><div class="card-header">'+element.post_id + '</div><div class="post-body"><h5 class="post-content" style="margin-top: 5px;">' + element.content + '</h5><p class="post-date" style="color: gray;">' + element.date_time + '</p><button type="button" class="btn btn-outline-danger">Like</button><h5 class="post-likes">' + element.likes_count + '</h5></div></div>';
                $('#posts').append(post);
                //$('#data_table').append($('<tr>').append($('<td>').text(element.password)));
            });

        }
    });

function Like(ele){
    
}

{/* <div class="card" style="width: 28rem; margin-top: 20px;">
    <div class="card-header">'+element.post_id + '</div>
    <div class="post-body">
        <h5 class="post-content" style="margin-top: 5px;">' + element.content + '</h5>
        <p class="post-date" style="color: gray;">' + element.date_time + '</p>
        <button type="button" class="btn btn-outline-danger">Like</button>
        <h5 class="post-likes">' + element.likes_count + '</h5>
    </div>
</div> */}

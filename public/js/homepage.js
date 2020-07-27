const ENV_HOST =  'http://'+window.location.hostname+':4000';




    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: ENV_HOST + '/api/posts/all_posts',
        success: function(data){
            console.log(data);
            $.each(data, function(index, element) {
                    
                //var markup = '<h6>' + element.content + '<br> Likes : ' + element.likes_count + '<br> Posted On : ' + element.date_time + '<br><br>';
                var card = '<div class="card" style="width: 18rem;"><div class="post-body"><h5 class="post-content">' + element.content + '</h5><p class="post-date">' + element.date_time + '</p><a class="btn btn-primary">Like</a><h5 class="post-likes">' + element.likes_count + '</h5></div></div>';
                $('#posts').append(card);
                //$('#data_table').append($('<tr>').append($('<td>').text(element.password)));
            });

        }
    });


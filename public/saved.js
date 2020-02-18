$(document).ready(function () {

    // grab articles as a JSON
    $.getJSON("/saved", function (data) {

        if (articles === NaN) {
            $("#articles").append("<h1>No saved articles</h1>");

        } else {

        // for each article data 
        for (var i = 0; i < data.length; i++) {

            // display the articles info on the page
            $("#articles")
                .prepend("<div class='col-sm-4'><div class='card'><div class='card-body'><a class='title-link' href='"
                    + data[i].link + "'><h5>"
                    + data[i].title + "</h5></a><hr><p class='card-text'>"
                    + data[i].summary + "</p><br />" + "<img class='card-img' src='"
                    + data[i].image + "'><hr>" + "<button data-id='" 
                    + data[i]._id + "' class='btn-comment btn btn-outline-dark btn-sm' data-toggle='modal' data-target='#commentModal'>Comment</button><button id='btn-delete' data-id='" 
                    + data[i]._id + "' class='btn btn-outline-danger btn-sm'>Delete</button></div></div></div>");
            };
        };
    });

    // delete article from saved articles page
    $(document).on("click", "#btn-delete", function() {
        let thisId = $(this).attr("data-id");

        $.ajax({
            method: "PUT",
            url: "/delete/" + thisId
        })
        .done(function() {
            location.reload();
        });
    });

    // clear articles if user wants to clear saved articles
    $(document).on("click", ".btn-clear", function() {
        $("#articles").empty();
        $("#articles").append("<h3 class='cleared text-center'>Articles cleared. Navigate to home page to find more!</h3>")
      });

    //   $(document).on("click", ".save-comment", function() {

    //     // $("comment-box").val().trim();
    //     let thisId = $(this).attr("data-id");

    //     $.ajax({
    //         method: "PUT",
    //         url: "/comment/" + thisId
    //     })
    //     .then(function() {
    //         $(".users-comments")
    //             .append("<ul class='list-group comment-modal-list'><li class='list-group-item comment-item'>" + url + "</li></ul>")
    //     });
    //   });

});
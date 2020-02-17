$(document).ready(function () {

    // grab articles as a JSON
    $.getJSON("/saved", function (data) {

        // for each article data 
        for (var i = 0; i < data.length; i++) {

            // display the articles info on the page
            $("#articles")
                .prepend("<div class='col-sm-4'><div class='card'><div class='card-body'><a class='title-link' href='"
                    + data[i].link + "'><h5>"
                    + data[i].title + "</h5></a><hr><p class='card-text'>"
                    + data[i].summary + "</p><br />" + "<img src='"
                    + data[i].image + "'><hr>" + "<button data-id='" 
                    + data[i]._id + "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#commentModal'>Comment</button><button id='btn-delete' data-id='" 
                    + data[i]._id + "' class='btn btn-outline-danger btn-sm'>Delete</button></div></div></div>");
        };
    });
});
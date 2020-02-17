$(document).ready(function() {

    // grab articles as a JSON
    $.getJSON("/articles", function(data) {
        
        // for each article data 
        for (var i = 0; i < data.length; i++) {

            // display the articles info on the page
            $("#articles")
            .prepend("<div class='col-sm-4'><div class='card'><div class='card-body'><a class='title-link' href='" + data[i].link +"'><h5>" + data[i].title + "</h5></a><hr><p class='card-text'>" + data[i].summary + "</p><br />" + "<img src='" + data[i].image + "'><hr>" + "<button data-id='" + data[i]._id + "'<button id='btn-save' data-id='" + data[i]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>");
        };
    });

    // on click function to fetch new articles
    $(document).on("click", ".btn-fetch", function() {
        
        $.ajax({
            method: "GET",
            url: "/scrape"
        })
        .done(function(data) {
            location.reload();
        });
    });

    // on click function to save an article
    $(document).on("click", "#btn-save", function() {
        $(this).addClass=("disabled");
        let thisId = $(this).attr("data-id");
        console.log(thisId);

        $.ajax({
            method: "PUT",
            url: "/saved/" + thisId,
        })
        .done(function(data) {
            console.log(data);
        });
    });

});
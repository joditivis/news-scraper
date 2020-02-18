$(document).ready(function() {

    // grab articles as a JSON
    $.getJSON("/articles", function(data) {
        
        // for each article data 
        for (var i = 0; i < data.length; i++) {

            // display the articles info on the page
            $("#articles")
            .prepend("<div class='col-sm-4'><div class='card'><div class='card-body'><a class='title-link' href='" 
            + data[i].link +"'><h5>" 
            + data[i].title + "</h5></a><hr><p class='card-text'>" 
            + data[i].summary + "</p><br />" + "<img class='card-img' src='" 
            + data[i].image + "'><hr>" + "<button id='btn-save' data-id='" 
            + data[i]._id + "' class='btn btn-outline-dark btn-sm'>Save Article</button></div></div></div>");
        };
    });

    // on click function to fetch new articles
    $(document).on("click", ".btn-fetch", function() {
        // access the scrape method if user wants to display new articles
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
        let thisId = $(this).attr("data-id");

        // ajax put method to put selected article by id onto the saved page
        $.ajax({
            method: "PUT",
            url: "/saved/" + thisId,
        })
        .done(function(data) {
            console.log(data);
        });
    });

    // clears all articles if user wants to empty
    $(document).on("click", ".btn-clear", function() {

        $("#articles").empty();

        $("#articles").append("<h3 class='cleared text-center'>Articles cleared. Fetch new articles if you want to see more.</h3>")
      });

});
// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

// require all models
const db = require("./models");

// initialize express
const PORT = process.env.PORT || 3000;
const app = express();


// configure middleware

// use morgan logger for logging requests
app.use(logger("dev"));

// parse requrest body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public a static folder
app.use(express.static("public"));

// connect to the mongo db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);


// routes

// a GET route for scraping The New York Times website
app.get("/scrape", function (req, res) {
    // grab the body of the html with axios
    axios.get("https://www.nytimes.com/section/politics").then(function (response) {
        // load that into cherrio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);

        $(".css-ye6x8s").each(function (i, elem) {

            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .find("h2")
                .text();
            result.summary = $(this)
                .find("p")
                .text();
            result.link = "https://www.nytimes.com" + $(this)
                .find("a")
                .attr("href");
            result.image = $(this)
                .find("img")
                .attr("src");
         
            console.log(result);

            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
            });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
    .sort({articleCreated:-1})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// route serve the articles and render the index
// findarticles and render the index  


// start the server
app.listen(PORT, function () {
    console.log("app running on port " + PORT + "!");
});
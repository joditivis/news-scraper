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
    axios.get("https://www.nytimes.com/section/t-magazine/design").then(function (response) {
        // load that into cherrio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);

        $(".css-ye6x8s").each(function (i, element) {

            let result = {};

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

                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // log any errors
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});

// route for getting all Articles from the database
app.get("/articles", function (req, res) {
    db.Article.find({})
        .sort({ articleCreated: -1 })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route for saving/updating specific article to be saved
app.put("/saved/:id", function (req, res) {
    db.Article.findByIdAndUpdate({ _id: req.params.id }, { $set: { saved: true } })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route for getting saved article
app.get("/saved", function (req, res) {
    db.Article.find({ saved: true })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route for deleting/updating a saved article
app.put("/delete/:id", function (req, res) {
    db.Article.findByIdAndUpdate({ _id: req.params.id }, { $set: { saved: false } })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route for saving/updating a specific Article's comment
// app.post("/comment/:id", function (req, res) {
//     db.Comment.create(req.body)
//         .then(function (dbComment) {
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
//         })
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });

// // route for getting a specific Article by id, populate it with its comment
// app.get("/comment/:id", function (req, res) {
//     db.Article.findOne({ _id: req.params.id })
//         .populate("comment")
//         .then(function (err) {
//             res.json(err);
//         });
// });


// start the server
app.listen(PORT, function () {
    console.log("app running on port " + PORT + "!");
});
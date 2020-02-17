var mongoose = require("mongoose");

// save a reference to the Schema constructor
const Schema = mongoose.Schema;

// using the schema constructor, create a new ArticleSchema object
const ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    // comment is an object that stores a Comment id
    // the ref property link the OnjectId to the Comment model
    // allows us to populate the Article with an associated Comment
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// creates the model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// export the Article model
module.exports = Article;
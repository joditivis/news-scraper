var mongoose = require("mongoose");

// saves a reference to the Schema constructor
var Schema = mongoose.Schema;

// using the Schema constructor, create a new CommentSchema object
// similar to a sequelize model
var CommentSchema = new Schema({
  title: String,
  body: String
});

// creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// export the comment model
module.exports = Comment;
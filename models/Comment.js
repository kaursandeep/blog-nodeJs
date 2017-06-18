//since we'll be creating a mongoose model for our user, we need to include the mongoose module
var mongoose = require('mongoose');

//User object model
module.exports= mongoose.model('Comment',{
   id: String,
   userId: String,
   postId:String,
   comment:String
});
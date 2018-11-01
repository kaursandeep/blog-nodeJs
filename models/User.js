//since we'll be creating a mongoose model for our user, we need to include the mongoose module
var mongoose = require('mongoose');

//User object model
module.exports= mongoose.model('User',{
   userId: String,
   firstName: String,
   lastName:String,
   email: String,
   password: String,
   profilePic: String
});
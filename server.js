// # SimplestServer
// by Insta Team(Sandeep, Mansavvy and Brahmpreet)

//require statements -- this adds external modules from node_modules or our own defined modules
var http = require('http');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var Post = require('./models/Post.js');
var User = require('./models/User.js');
var Comment = require('./models/Comment.js');

// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
var router = express();
var server = http.createServer(router);

//establish connection to our mongodb instance
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:76east@ds159371.mlab.com:59371/instagram-db', function(err, db) {
  if (err) throw err;
  console.log("Connected to Database!");
  //db.close();
});

/*sample code that creates a Post object
var post = new Post({ 
  image: './img/IMG_5335.JPG',
  content: '##Nice Expericence!!#Enjoy',
  likeCount: 0,
  feedbackCount: 0,
  userid:'59418c43c8547758c73fe095'
});
//and then saves it to the mongodb instance we connected to above
post.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('posted');
  }
});*/


/*sample code that creates a User object
var user = new User({ 
   firstName: 'Sandeep',
   lastName: 'dhaliwal',
   username: 'sandeepkaur452@gmail.com',
   password: 'test123',
   profilePic: 'man.png'
});
//and then saves it to the mongodb instance we connected to above
user.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('posted');
  }
});*/

/*sample code that creates a Comment object
var comment = new Comment({ 
   userId: '59418c43c8547758c73fe095',
   postId: '59416315f88ac621dbb9df5c',
   comment: 'Amazing!!'
});
//and then saves it to the mongodb instance we connected to above
comment.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('comment posted');
  }
});*/

//tell the router (ie. express) where to find static files
router.use(express.static(path.resolve(__dirname, 'client')));
//tell the router to parse JSON data for us and put it into req.body
router.use(express.bodyParser());

//tell the router how to handle a get request to the root 
router.get('/', function(req, res){
  console.log('client requests posts.html');
  //use sendfile to send our posts.html file
  res.sendfile(path.join(__dirname, 'client/view','posts.html'));
});

//tell the router how to handle a post request to /posts and /users
router.post('/posts', function(req, res){
  console.log('client requests posts list');
  var answer = {};
  //go find all the posts in the database
  Post.find({})
  .then(function(paths){
    //send them to the client in JSON format
    //res.json(paths);
    answer.posts = paths;
    //find user in db
    return User.findOne(); 
  })
 
  .then(function(user){
    answer.user = user;
    res.json(answer);
    //return User.findOne(); 
  })
  
  /*.then(function(comment){
    answer.commentss = comment;
   res.json(answer);
   //return Comment.findOne(); 
  })*/
  
});

/*tell the router how to handle a post request to /users
router.post('/posts', function(req, res){
  console.log('client requests users list');
  //go find all the posts in the database
  User.find({})
  .then(function(paths){
    //send them to the client in JSON format
    res.json(paths);
  })
  
});*/

//tell the router how to handle a post request to /incrLike Button
router.post('/incrLike', function(req, res){
  console.log('increment like for ' + req);
  //go get the post record
  Post.findById(req.body.id)
  .then(function(post){
    //increment the like count
    post.likeCount++;
    //save the record back to the database
    return post.save(post);
  })
  .then(function(post){
    //a successful save returns back the updated object
    res.json({id: req.body.id, count: post.likeCount});  
  })
  
  .catch(function(err){
    console.log(err);
  })
});

/*tell the router how to handle a post request to /Comments
router.post('/comment', function(reqs, ress){
  console.log('comments section' + reqs);
  //go get the comment record
   Comment.find({})
  .then(function(comm){
    //send them to the client in JSON format
    ress.json(comm);
  })
  
  .catch(function(err){
    console.log(err);
  })
});*/


//set up the HTTP server and start it running
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
  var addr = server.address();
  console.log('Server listening at', addr.address + ':' + addr.port);
});

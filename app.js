

const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. This allows Node.js to be very performant.A Node.js app runs in a single process, without creating a new thread for every request. Node.js provides a set of asynchronous I/O primitives in its standard library that prevent JavaScript code from blocking and generally, libraries in Node.js are written using non-blocking paradigms, making blocking behavior the exception rather than the norm";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



//db connection

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model('Post', postSchema);


app.get('/', (req, res) => {

  Post.find({}, function (err, posts) {
    res.render("home", {
      homenode: homeStartingContent,
      posts: posts
    });
  });



});

app.get('/compose', (req, res) => {
  res.render("compose",);

});

app.post('/compose', (req, res) => {

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function (err) {
    if (!err) {
      res.redirect('/');
    }
  });



});

app.get('/posts/:postid', (req, res) => {

  const requestedPostid = req.params.postid;

  Post.findOne({ _id: requestedPostid }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

 

});

app.get('/about', (req, res) => {
  res.render('about', { aboutcontent: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactcontent: contactContent })
});















const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});

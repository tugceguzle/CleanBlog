const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postController = require('./controller/postControllers');
const pageController = require('./controller/pageController');
require('dotenv').config()
const app = express();

mongoose.connect(`mongodb+srv://tugce:${process.env.MONGO_PASSWORD}@cluster0.ixsvn9z.mongodb.net/?retryWrites=true&w=majority`);

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method',{
  methods:['GET','POST']
}));

app.get('/', postController.getAllPosts);
app.put('/posts/:id', postController.updatePost);  
app.get("/posts/:id", postController.getPost);
app.delete('/posts/:id', postController.deletePost);
app.post('/posts', postController.createPost);

app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

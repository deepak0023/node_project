const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://admin:admin%40123@cluster0.prxlhlr.mongodb.net/sample_database";

mongoose.connect(dbURI)
  .then(result => app.listen(4000))
  .catch(err => console.log(err));


// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Sample values that can be got for each request in middleware
app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

// logging
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })

    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  const blogs = [
    {title: 'Sample Title 1', snippet: 'Sample Body 1'},
    {title: 'Sample Title 2', snippet: 'Sample Body 2'},
    {title: 'Sample Title 3', snippet: 'Sample Body 3'},
  ];
  res.render('index', {  title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
});

app.post('/blogs', (req, res) => {
    console.log("backend input \n");
    console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
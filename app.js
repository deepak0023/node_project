const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// middleware & static files
app.use(express.static('public'));

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

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
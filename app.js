const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

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
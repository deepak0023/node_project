const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>hello, student</h1>');
    res.end();
});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
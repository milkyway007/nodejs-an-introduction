const http = require('http');
const PORT = 4000;

const server = http.createServer((request, response) => {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    });
    request.on('end', (chunk) => {
        body = Buffer.concat(body).toString();
        let username = 'Unknown user!';
        if (body) {
            username = body.split('=')[1];
        }
        response.setHeader('Content-Type', 'text/html')
        response.write(
            `<h1>Hi ${username}</h1>
            <form method='POST' action='/'>
                <input name='username' type='text'>
                <button type='submit'>Send</button>
            </form>`
            );
        response.end();
    });
});

server.listen(PORT);
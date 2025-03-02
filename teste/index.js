const http = require('http');
const fs = require('fs');

const page = fs.readFileSync('./index.html', 'utf-8');

const server = http.createServer((req, res)=>{
    const url = req.url;
    if(url === '/form') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(page);
    } else {
        res.end('There are no endpoint for that route')
    }
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('http://localhost:8000')
})
// console.log(page)
const fs = require("fs");
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data)

// const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'content-type':'text/html'});

        const cardsHtml = dataObject.map(el=>(replaceTemplate(tempCard, el)));

        res.end(tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml))
    } else if (pathname === '/product') {
        res.writeHead(200, {'content-type': 'text/html'});
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)

        res.end(output)

    } else if (pathname === '/api') {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(data);

    } else {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end('<h1>page not found!</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
})

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File written");

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', err=>{
//         console.log('Your file has been written')
//       })
//     });
//   });
// });

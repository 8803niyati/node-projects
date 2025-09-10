const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    let filepath ="";
    switch (req.url){
        case "/":
            filepath="./index.html"
            break;
        case "/about":
            filepath="./about.html"
            break;
        case "/menu":
            filepath="./menu.html"
            break;
        case "/gallery":
            filepath="./gallery.html"
            break;
        case "/contact":
            filepath="./contact.html"
            break;
        default:
            filepath="./notfound.html"
            break;
    }
    let data = fs.readFileSync(filepath,'utf-8');
    res.end(data);
});

const port = 8000;
server.listen(port,() => {
    console.log(`server start at http://localhost:${port}`);
});

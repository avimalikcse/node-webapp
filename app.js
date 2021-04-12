const hostname = '127.0.0.1';
const port = 8080;
const server = require('./server.js'); // main server file

const portHandler = (err, results) => {
    console.log(`Server running at http://${hostname}:${port}/`);
}
server.listen(port, hostname, portHandler); //open a port and start forwarding request to server.js
const http = require('http');
const url = require('url');
const fs = require('fs');

const fileHelper = require('./src/fileHelper')

const { home, pageContent, smallContent, largeContent } = require('./src/controller')

/**
 * An object which contains all Path level details like, route, method, controller 
 * key is pathname,with details object as value
 */
const pathConfig = {
    '/': {
        method: 'GET',
        controller: home
    },
    '/get-page-content': {
        method: 'GET',
        controller: pageContent
    },
    '/get-small-content': {
        method: 'GET',
        controller: smallContent
    },
    '/get-large-content': {
        method: 'GET',
        controller: largeContent
    }
}


// send 500 in case of any error 
const serverError = (request, response, err) => {
    console.log(err)
    response.writeHeader(500, { "Content-Type": "text/html" });
    response.write("Something Went Wrong");
    response.end();
}

/**
 * Main function 
 * create one HTTP server using node http package 
 * 
 * takes a callback function with request and response as arguments 
 */

module.exports = http.createServer((request, response) => {

    const reqUrl = url.parse(request.url, true); // parse the url
    const routeDetails = pathConfig[reqUrl.pathname] ? pathConfig[reqUrl.pathname] : null // get the Path config details or set null
    try {
        // serve the static files directly from path
        if (/\.(css)$/.test(reqUrl.pathname)) {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(fs.readFileSync(__dirname + '/src/assets' + reqUrl.pathname, 'utf8'));
            response.end();
        } else if (!routeDetails || routeDetails.method != request.method) {

            // Check if Route is configured and request Method is as expected i.e GET/POST
            // if it does not match the requirement, send 404 http status code

            fileHelper.fileReader('./templates/notFound.html').then().then(htmlContent => {
                response.writeHeader(404, { "Content-Type": "text/html" });
                response.write(htmlContent);
                response.end();
            }).catch(err => {
                serverError(request, response, err)
            })
        } else {
            routeDetails.controller(request, response) // call the controller function here
        }

    } catch (err) {
        // OOPSSS!!!!.. throws 500
        serverError(request, response, err)
    }
})
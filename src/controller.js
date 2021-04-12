const fileHelper = require('./fileHelper')

const memorizeContent = {}

/**
 * cache layer
 * 
 * @param {string} path path of file
 * 
 * return memorized data
 */
const cacheWrapper = async(path) => {
    if (!memorizeContent[path]) {
        const data = await fileHelper.fileReader(path)
        memorizeContent[path] = data
    }
    return memorizeContent[path]
}

const home = async(req, response) => {
    getPageContent = await cacheWrapper('./templates/home.html')
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(getPageContent);
    response.end();
}

const pageContent = async(req, response) => {
    getPageContent = await cacheWrapper('./templates/pageContent.html')
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(getPageContent);
    response.end();
}
const smallContent = async(req, response) => {
    getPageContent = await cacheWrapper('./templates/smallContent.html')
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(getPageContent);
    response.end();
}
const largeContent = async(req, response) => {
    getPageContent = await cacheWrapper('./templates/largeContent.html')
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(getPageContent);
    response.end();
}
module.exports = { home, pageContent, smallContent, largeContent }
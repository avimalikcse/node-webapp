const fs = require('fs');
const path = require('path');

const fileReader = (filePath) => {
    return new Promise((resolve, reject) => {
        const fileAbsPath = path.join(__dirname, filePath);
        fs.readFile(fileAbsPath, function (err, content) {
            if (err) reject(err)
            resolve(content)
        })
    })
}

module.exports = { fileReader }

const fs = require('fs');

fs.readFile('3-read-from-file.md', 'utf8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(data);
})


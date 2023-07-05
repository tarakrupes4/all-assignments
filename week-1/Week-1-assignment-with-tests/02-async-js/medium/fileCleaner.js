const fs = require('fs');

fs.readFile('new.txt', 'utf-8', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    const list = data.split(" ").filter(d=>d.length>0);
    console.log(list);
    fs.writeFile('revised.txt', list.join(" "), (error, data) => {
         if (error) {
           console.log(error);
           return;
        }
        console.log('file created --');
    })
})
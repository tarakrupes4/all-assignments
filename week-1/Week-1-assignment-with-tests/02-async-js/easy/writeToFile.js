const fs = require('fs');


fs.writeFile('new.txt', 'Eren Yeager', (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("file created ..");
})

function clock() {
    console.clear();
    let t = new Date();
    console.log(t.getHours() + ' : ' + t.getMinutes() + ' : ' + t.getSeconds());
    
}

setInterval(clock, 1000);
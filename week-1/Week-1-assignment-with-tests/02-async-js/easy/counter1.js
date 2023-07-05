
var i = 1;

export function counter() {
    console.clear();
    console.log(i);
    i++;
}

setInterval(counter, 1000);
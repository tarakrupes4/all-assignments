
var i = 0;

function counter() {
    while (true) {
        console.log(i);
        let sum = 0;
        for (let j = 1; j < 800500000; j++) {
          sum += j;
        }
        console.clear();
        i++;
    }
}

counter();
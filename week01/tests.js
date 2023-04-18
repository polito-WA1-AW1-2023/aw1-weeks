'use strict';

let book = {
author : "Enrico",
pages: 340,
chapterPages: [90,50,60,140],
};

let book2 = {...book};
console.log(book2);
book2.pages =  10;
console.log(book);
console.log(book2);

//{chapterPages: [...book.chapterPages]});

function square(x) {
    let y = x * x;
    return y;
}
let cube = function c(x) {
    let y = square(x) * x;
    return y;
}
let fourth = x => square(x) * square(x);

let n = fourth(4);

console.log(n);



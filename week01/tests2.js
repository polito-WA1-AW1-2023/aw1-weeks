"use strict";

function hypotenuse(a, b) {
    const square = x => x * x;
    return Math.sqrt(square(a) + square(b));
}


function hypotenuse2(a, b) {
    function square(x) { return x * x; }
    return Math.sqrt(square(a) + square(b));
}


console.log(hypotenuse(3,4));



function greeter(name) {
    const myname = name;
    const hello = function () {
        return "Hello " + myname;
    }
    return hello;
}
const a = greeter("Tom");
const b = greeter("Jerry");
console.log(a());
console.log(b());
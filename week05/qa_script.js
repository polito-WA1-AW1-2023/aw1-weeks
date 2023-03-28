"use strict";

let p = document.createElement('p');
let d = dayjs().format("YYYY-MM-DD HH:mm:ss");
p.innerText = d;
document.getElementById("time").appendChild(p);

setInterval(  ()=> p.innerText = dayjs().format("YYYY-MM-DD HH:mm:ss") , 1000);




//document.getElementsByTagName("table")[0].classList.remove("table");


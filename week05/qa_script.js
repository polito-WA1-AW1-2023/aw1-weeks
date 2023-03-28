"use strict";

window.addEventListener('load', event => {
    let p = document.createElement('p');
    let d = dayjs().format("YYYY-MM-DD HH:mm:ss");
    p.innerText = d;
    document.getElementById("time").appendChild(p);

    setInterval(() => p.innerText = dayjs().format("YYYY-MM-DD HH:mm:ss"), 1000);

    let rows = document.querySelectorAll('table tr');

    for (let row of rows) {


        let b = row.querySelector('button');
        if (b)
            b.addEventListener('click', event => {
                //console.log(event.target, "cliccato!");
                //console.log(row.children[3].innerText);
                const score = row.children[3].innerText;
                const newScore = parseInt(score) + 1;
                row.children[3].innerText = newScore;
            })

    }

//document.getElementsByTagName("table")[0].classList.remove("table");

});
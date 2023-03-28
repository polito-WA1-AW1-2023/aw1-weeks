"use strict";

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
    this.str = function () { return `${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score}` }
}


const answerList = [
    new Answer('for of', 'Alice', 3, dayjs('2023-03-07')),
    new Answer('for i=0,i<N,i++', 'Harry', 1, dayjs('2023-03-04')),
    new Answer('for in', 'Harry', -2, dayjs('2023-03-02')),
    new Answer('i=0 while(i<N)', 'Carol', -1, dayjs('2023-03-01')),
];


function createAnswerElement(ans) {

    const newTd1 = document.createElement("td");
    const newContentDate = document.createTextNode(ans.date.format('YYYY-MM-DD'));
    newTd1.appendChild(newContentDate);
    const newTd2 = document.createElement("td");
    const newContentText = document.createTextNode(ans.text);
    newTd2.appendChild(newContentText);
    const newTd3 = document.createElement("td");
    const newContentRespondent = document.createTextNode(ans.respondent);
    newTd3.appendChild(newContentRespondent);
    const newTd4 = document.createElement("td");
    const newContentScore = document.createTextNode(ans.score);
    newTd4.appendChild(newContentScore);

    const newTd5 = document.createElement("td");
    newTd5.innerHTML = '<button type="button" class="btn btn-danger">Vote</button>';


    const newTr = document.createElement("tr");
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
    newTr.appendChild(newTd4);
    newTr.appendChild(newTd5);

    return newTr;

    /* (NB: in this case, "<" must be converted into &lt; manually)
        const newTr = document.createElement("tr");
        newTr.innerHTML = `<td>${ans.date.format('YYYY-MM-DD')}</td>
            <td>${ans.text}</td>
            <td>${ans.respondent}</td>
            <td>${ans.score}</td>
            <td><button type="button" class="btn btn-danger">Vote</button></td>`;
        return newTr;
    */
}

window.addEventListener('DOMContentLoaded', event => {

    const tableBody = document.querySelector('tbody');

    for (let ans of answerList) {
        const newRow = createAnswerElement(ans);
        tableBody.appendChild(newRow);
    }

    const rows = document.querySelectorAll('tbody tr');

    for (let row of rows) {
        if (row.firstElementChild.tagName.toLowerCase() !== 'th') {  // make sure case is correct

            row.addEventListener('click', event => {
                console.log(event.target, row);
                //console.log(event.target.innerHTML);
                //console.log(row.innerHTML);
                const score = row.children[3].innerText;
                // console.log(score);

                const comments = document.getElementById('comments');
                comments.insertAdjacentHTML('beforeend', `<p>The score is: ${score}</p>`);
            });

        }
    }

});


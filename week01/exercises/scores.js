"use strict";

const myScores = [-12, -3, 18, 10, 4, -1, 0, 14];

const modifiedScores = [...myScores];

modifiedScores.sort( (a,b) => (a-b) );

let NN = modifiedScores.findIndex( el => el >= 0 )

console.log(NN);
modifiedScores.splice(0, NN);

let avg = 0;
for (const val of modifiedScores)
    avg += val;
avg = avg / modifiedScores.length;

const addedArray = Array(NN).fill(Math.round(avg));

modifiedScores.splice(modifiedScores.length, 0, ...addedArray);

console.log(modifiedScores);
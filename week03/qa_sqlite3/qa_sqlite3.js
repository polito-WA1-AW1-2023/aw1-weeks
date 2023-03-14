"use strict";

const dayjs = require('dayjs');

const sqlite = require('sqlite3');
const db = new sqlite.Database('qa.sqlite',
  (err) => { if (err) throw err; });

let now = dayjs();

//console.log(now.format());

//let answers = [];

function Answer(text, respondent, score, date) {
  this.text = text;
  this.respondent = respondent;
  this.score = score;
  this.date = date;
  this.str = function () { return `${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score}` }
}

function Question(id, text, questioner, date) {
  this.id = id;
  this.text = text;
  this.questioner = questioner;
  this.date = date;
  this.list = [];  // To be retrieved from DB (remove from here)

  /*
  this.add =  (e) => {
      this.list.push(e);
  }
  */

  this.add = (e) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO answers(text, respondent, score, date) VALUES(?, ?, ?, DATE(?))';
      db.run(sql, [e.text, e.respondent, e.score, e.date.format('YYYY-MM-DD')], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  };

  this.average = () => {
    let avg = 0;
    for (const val of this.list)
      avg += val.score;
    avg = avg / this.list.length;
    return avg;
  }

  this.findAll = (name) => {
    for (const e of this.list)
      if (e.name === name)
        return e;
    return undefined;
  }

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM answers';
      db.all(sql, [], (err, rows) => {
        if (err)
          reject(err);
        else {
          const answers = rows.map(row => new Answer(row.text, row.respondent, row.score, dayjs(row.date)));
          resolve(answers);
        }
      });
    });
  };

  this.find = (respondent) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM answers WHERE respondent=?';
      db.all(sql, [respondent], (err, rows) => {
        if (err)
          reject(err);
        else {
          const answers = rows.map(row => new Answer(row.text, row.respondent, row.score, dayjs(row.date)));
          resolve(answers);
        }
      });
    });
  };

  this.getWorst = (num) => {
    return new Promise((resolve, reject) => {
      // Ordering can be done either via SQL (if simple) or afterwards if there is not too much data
      const sql = 'SELECT * FROM answers ORDER BY score LIMIT ?';
      db.all(sql, [num], (err, rows) => {
        if (err)
          reject(err);
        else {
          const answers = rows.map(row => new Answer(row.text, row.respondent, row.score, dayjs(row.date)));
          resolve(answers);
        }
      });
    });
  };

  this.afterDate = (date) => {
    // NB: expect the date as a string and not as a dayjs object, so it can be directly inserted in the query
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM answers WHERE date > ?';
      db.all(sql, [date], (err, rows) => {
        if (err)
          reject(err);
        else {
          const answers = rows.map(row => new Answer(row.text, row.respondent, row.score, dayjs(row.date)));
          resolve(answers);
        }
      });
    });
  };

  this.filter = (callback) => {
    for (const e of this.list)
      if (callback(e))
        return e;
    return undefined;
  }

  this.filterFunctional = (c) => this.list.filter(c);

  this.listByScore = () => {
    const newList = [...this.list];
    return newList.sort((a, b) => a.score - b.score);
  }

  this.listByDate = () => {
    const newList = [...this.list];
    return newList.sort((a, b) => a.date.diff(b.date));
  }


}

const ans1 = new Answer('for of', 'Alice', 3, dayjs('2023-03-06'));
const ans2 = new Answer('for i=0,i<N,i++', 'Harry', 1, dayjs('2023-03-04'));
const ans3 = new Answer('for in', 'Harry', -2, dayjs('2023-03-02'));
const ans4 = new Answer('i=0 while(i<N)', 'Carol', -1, dayjs('2023-03-01'));

console.log(ans1.str());

const q = new Question(1, 'Best way of enumerating an array in JS', 'Enrico', dayjs('2023-02-28'));

async function load() {
  await q.add(ans1);
  await q.add(ans2);
  await q.add(ans3);
  await q.add(ans4);
}

//load().then( ()=> console.log("load ended"));   // to be executed only once

//const list = q.getAll();
//console.log(list);

function printList(list) {
  console.log("---- list of answers ----");
  for (const a of list)
    console.log(a.str());
  console.log("-------");
}


q.getAll().then((list) => {
  printList(list);
});

q.find('Harry').then(printList);

q.getWorst(2).then(printList);

q.afterDate('2023-03-03').then(printList);



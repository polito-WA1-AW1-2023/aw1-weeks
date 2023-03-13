# Exercise 4: Q&A, with a database
_Goal: interacting with a database while experimenting with async code_.

Update the previous "Q&A" exercise to use a database.

Manage a list of objects and related database tables (`qa.sqlite`) that include information about the answers:

- Id of the answer
- Text of the answer
- Respondent
- Score
- Date

The `Question` object will have the following methods, operating on the database, which return Promises:

- `add(answer)` // pass a fully-constructed `Answer` object to be added in the database
- `getAll()` // returns (a Promise that resolves to) an array containing all the `Answer` objects
- `find(respondent)` //returns (a Promise that resolves to) an array containing all the matching `Answer` objects (all answers given by the respondent)
- `afterDate(date)` // returns (a Promise that resolves to) an array of `Answers` after the given date
- `getWorst(num)` // returns (a Promise that resolves to) an array of `Answers` with the _num_ `Answers` with the lowest score

For the moment, do not consider the possibility that there can be multiple `Question` objects, each connected with its set of answers.
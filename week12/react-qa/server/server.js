'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const cors = require('cors');

// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const answerDelay = 2000;

/*** APIs ***/

// GET /api/questions
app.get('/api/questions', (req, res) => {
  dao.listQuestions()
    .then(questions => setTimeout(()=>res.json(questions), answerDelay))
    .catch(() => res.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/questions/:id', async (req, res) => {
  try {
    const result = await dao.getQuestion(req.params.id);
    if(result.error)
      res.status(404).json(result);
    else
      setTimeout(()=>res.json(result), answerDelay);
  } catch(err) {
    res.status(500).end();
  }
});

// GET /api/questions/<id>/answers
app.get('/api/questions/:id/answers', async (req, res) => {
  try {
    const resultQuestion = await dao.getQuestion(req.params.id);
    //console.log('Question: ' + JSON.stringify(resultQuestion));
    if (resultQuestion.error)
      res.status(404).json(resultQuestion);   // questionId does not exist
    else {
      const result = await dao.listAnswersByQuestion(req.params.id);
      //console.log("result: "+JSON.stringify(result));
      //console.log("length: "+result.length);
      if (result.error)
        res.status(404).json(result);
      else
        setTimeout(()=>res.json(result), answerDelay);  // NB: list of answers can also be an empty array
    }
  } catch(err) {
    res.status(500).end();
  }
});


// GET /api/answers
app.get('/api/answers', async (req, res) => {
  try {
    const answers = await dao.listAnswers();
    res.json(answers);
  } catch(err) {
    res.status(500).end();
  }
});

// GET /api/answers/<id>
app.get('/api/answers/:id', async (req, res) => {
  try {
    const result = await dao.getAnswer(req.params.id);
    if(result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch(err) {
    res.status(500).end();
  }
});


// POST /api/answers
app.post('/api/answers', [
  check('score').isInt(),
  check('respondent').isLength({min: 1}),   // as an example
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const questionId = req.body.questionId;
  const resultQuestion = await dao.getQuestion(questionId);  // needed to ensure db consistency
  if (resultQuestion.error)
    res.status(404).json(resultQuestion);   // questionId does not exist, please insert the question before the answer
  else {
    const answer = {
      questionId: questionId,
      score: req.body.score,
      date: req.body.date,
      text: req.body.text,
      respondent: req.body.respondent,
    };

    try {
      const answerId = await dao.createAnswer(answer);
      // Return the newly created id of the question to the caller. 
      // A more complex object can also be returned (e.g., the original one with the newly created id)
      setTimeout(()=>res.status(201).json(answerId), answerDelay);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of answer ${answer.text} by ${answer.respondent}.` });
    }
  }
});


// PUT /api/answers/<id>
app.put('/api/answers/:id', [
  check('score').isInt(),
  check('respondent').isLength({min: 1}),   // as an example
  check('date').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  check('id').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const answer = req.body;
  // you can also check here if the id passed in the URL matches with the id in req.body,
  // and decide which one must prevail, or return an error
  answer.id = req.params.id;

  try {
    const numRowChanges = await dao.updateAnswer(answer);
    setTimeout(()=>res.json(numRowChanges), answerDelay);
    //res.status(200).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the update of answer ${req.params.id}.`});
  }

});


// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote', [
  check('id').isInt(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
    const numRowChanges = await dao.voteAnswer(req.params.id, req.body.vote);
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch (err) {
    res.status(503).json({ error: `Database error during the vote of answer ${req.params.id}.` });
  }

});


// DELETE /api/answers/<id>
app.delete('/api/answers/:id', async (req, res) => {
  try {
    const numRowChanges = await dao.deleteAnswer(req.params.id);  
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of answer ${req.params.id}.`});
  }
});


/*** Other express-related instructions ***/

// Activate the server
app.listen(port, () => {
  console.log(`react-qa-server listening at http://localhost:${port}`);
});

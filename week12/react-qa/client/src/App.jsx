import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import AnswerRoute from './components/AnswerRoute';
import { FormRoute } from './components/AnswerForm';
import API from './API';
//import './App.css';

function DefaultRoute() {
  return(
    <Container className='App'>
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
      <Link to='/'>Please go back to main page</Link>
    </Container>
  );
}

function App() {
  const [question, setQuestion] = useState({});
  const [answerList, setAnswerList] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dirty, setDirty] = useState(true);

  const questionId = 1;

  function handleError(err) {
    console.log(err);
  }

  useEffect( () => {
    API.getQuestion(questionId)
      .then((q) => setQuestion(q))
      .catch((err) => handleError(err));
  }, []);

  useEffect( () => {
    if (dirty) {

      API.getAnswersByQuestionId(questionId)
        .then((answerList) => {
          setAnswerList(answerList);
          setInitialLoading(false);
          setDirty(false);
        })
        .catch((err) => handleError(err));
      }

  }, [question.id, dirty]);

  function increaseScore(id) {
    //console.log('increase score id: '+id);
    setAnswerList((oldList) => oldList.map((e) => {
      if (e.id === id) {
        return Object.assign({}, e, { score: e.score + 1, status: 'updated' });
      } else {
        return e;
      }
    })
    );
    API.voteAnswer(id)
      .then(() => {
        setDirty(true);
      })
      .catch((err) => handleError(err));
  }

  const deleteAnswer = (id) => {
    /* setAnswerList((oldList) => oldList.filter(
      (e) => e.id !== id
    ));
    */
    setAnswerList((oldList) => oldList.map(
      e => e.id !== id ? e : Object.assign({}, e, {status: 'deleted'})
    ));
    API.deleteAnswer(id)
      .then(() => setDirty(true))
      .catch((err) => handleError(err));
  }

  const addAnswer = (e) => {
    setAnswerList((oldList) => {
      // Create a new temporary id, waiting for a truly unique id that can only be supplied by the server
      // This temporary id will be replaced when the server will provide its id.

      // NB: Math.max: do not forget ... (spread), max does not take an array as parameter
      const newTempId = Math.max(...oldList.map((e) => e.id)) + 1;
      e.id = newTempId;
      return [...oldList, e];
    }
    );
  }

  const editAnswer = (newEl) => {
    setAnswerList((oldList) => oldList.map((e) => {
      if (e.id === newEl.id) {
        return newEl;
      } else {
        return e;
      }
    }));
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <AnswerRoute initialLoading={initialLoading}
          question={question} answerList={answerList}
          increaseScore={increaseScore} addAnswer={addAnswer} deleteAnswer={deleteAnswer}
          editAnswer={editAnswer} /> } />
        <Route path='/add' element={ <FormRoute addAnswer={addAnswer} /> } />
        <Route path='/edit/:answerId' element={<FormRoute answerList={answerList}
          addAnswer={addAnswer} editAnswer={editAnswer} />} />
        <Route path='/*' element={<DefaultRoute />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App

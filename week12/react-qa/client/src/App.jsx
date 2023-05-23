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
  const [errorMsg, setErrorMsg] = useState('');

  function handleError(err) {
    console.log(err);
    let errMsg = 'Unkwnown error';
    if (err.errors)
      if (err.errors[0].msg)
        errMsg = err.errors[0].msg;
    else if (err.error)
      errMsg = err.error;
        
    setErrorMsg(errMsg);
    setTimeout(()=>setDirty(true), 2000);  // Fetch correct version from server, after a while
  }

  const questionId = 1;

  useEffect( () => {
    API.getQuestion(questionId)
      .then((q) => setQuestion(q))
      .catch((err) => handleError(err));
  }, []);

  useEffect( () => {
    //console.log("dirty: "+dirty);
    if (question.id && dirty) {
      API.getAnswersByQuestionId(question.id)
        .then((answerList) => {
          setAnswerList(answerList);
          setDirty(false);
          setInitialLoading(false);
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
      .then(() => setDirty(true))
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
    // REMEMBER to add questionId
    e.questionId = question.id;

    setAnswerList((oldList) => {
      // Create a new temporary id, waiting for a truly unique id that can only be supplied by the server
      // This temporary id will be replaced when the server will provide its id.

      // NB: Math.max: do not forget ... (spread), max does not take an array as parameter
      const newTempId = Math.max(...oldList.map((e) => e.id)) + 1;
      e.id = newTempId;
      e.status = 'added';
      return [...oldList, e];
    }
    );
    API.addAnswer(e)
      .then(() => setDirty(true))
      .catch((err) => handleError(err));
  }


  const editAnswer = (newEl) => {
    setAnswerList((oldList) => oldList.map((e) => {
      if (e.id === newEl.id) {
        newEl.status = 'updated';
        return newEl;
      } else {
        return e;
      }
    }));
    API.updateAnswer(newEl)
      .then(() => setDirty(true))
      .catch((err) => handleError(err));
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <AnswerRoute errorMsg={errorMsg} resetErrorMsg={()=>setErrorMsg('')}
          initialLoading={initialLoading} question={question} answerList={answerList}
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

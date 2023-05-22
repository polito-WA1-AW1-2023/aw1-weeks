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

  const questionId = 1;

  useEffect( () => {
    API.getQuestion(questionId)
      .then((q) => setQuestion(q))
      .catch((err) => console.log(err));

    API.getAnswersByQuestionId(questionId)
      .then((answerList) => setAnswerList(answerList))
      .catch((err) => console.log(err));

  }, []);

  function increaseScore(id) {
    //console.log('increase score id: '+id);
    setAnswerList((oldList) => oldList.map((e) => {
      if (e.id === id) {
        return Object.assign({}, e, { score: e.score + 1 });
      } else {
        return e;
      }
    })
    )
  }

  const deleteAnswer = (id) => {
    setAnswerList((oldList) => oldList.filter(
      (e) => e.id !== id
    ));
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
        <Route path='/' element={ <AnswerRoute question={question} answerList={answerList}
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

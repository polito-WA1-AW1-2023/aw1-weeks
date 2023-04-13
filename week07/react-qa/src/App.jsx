import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
//import './App.css';


function Answer(id, text, respondent, score, date) {
  this.id = id;
  this.text = text;
  this.respondent = respondent;
  this.score = score;
  this.date = date;
  this.str = function () { return `ID ${id}: ${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score}` }
}


const answerList = [
  new Answer(1, 'for of', 'Alice', 3, dayjs('2023-03-07')),
  new Answer(5, 'for i=0,i<N,i++', 'Harry', 1, dayjs('2023-03-04')),
  new Answer(3, 'for in', 'Harry', -2, dayjs('2023-03-02')),
  new Answer(6, 'i=0 while(i<N)', 'Carol', -1, dayjs('2023-03-01')),
];

function MyHeader(props) {
  return (
    <header>
      <h1>{props.appName || "HeapOverrun"}</h1>
    </header>
  );
}


function MyFooter(props) {
  return (<footer>
    <p>&copy; 2023, Applicazioni Web I</p>
    <div id="time"></div>
  </footer>);
}

function MyRow(props) {
  const { e } = props;
  return (
    <tr>
      <td>{e.date.format("YYYY-MM-DD")}</td>
      <td>{e.text}</td>
      <td>{e.respondent}</td>
      <td>{e.score}</td>
      <td><Button variant="primary" onClick={props.increaseScore}>Vote</Button>
      <Button variant="danger" onClick={props.deleteRow}>Delete</Button></td>
    </tr>
  );
}

function MyTable(props) {
  const [list, setList] = useState(props.listOfAnswers);

  function increaseScore(id) {
    //console.log('increase score id: '+id);
    setList((oldList) => oldList.map((e) => {
      if (e.id === id) {
        return Object.assign({}, e, { score: e.score + 1 });
      } else {
        return e;
      }
    })
    )
  }

  const deleteRow = (id) => {
    setList( (oldList) => oldList.filter(
      (e) => e.id!==id
    ));
  }

  return (
    <Table>
      {/* <Table striped bordered hover> */}
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((e) =>
          <MyRow e={e} key={e.id} increaseScore={()=>increaseScore(e.id)}
            deleteRow={()=>deleteRow(e.id)} />)
        }
        <tr>
          <td><Form.Control type="date" name="date" /></td>
          <td><Form.Control type="text" name="text" /></td>
          <td><Form.Control type="text" name="respondent" /></td>
          <td><Form.Control className="w-25" type="text" name="score" /></td>
          <td><Button variant="primary">+</Button> </td>
        </tr>
      </tbody>
    </Table>
  )
}


function Main(props) {
  return (<>
    <Row>
      <Col xs={9}>
        <p>Question: Best way of enumerating an array in JS</p>
      </Col>
      <Col xs={3}>
        <p>Author: Enrico</p>
      </Col>
    </Row>
    <Row>
      <h2>Current Answers</h2>
    </Row>
    <Row>
      <MyTable listOfAnswers={answerList} />
    </Row>
  </>
  );
}

function App() {

  return (
    <Container fluid>
      <MyHeader />
      <Main />
      <MyFooter />
    </Container>
  )
}

export default App

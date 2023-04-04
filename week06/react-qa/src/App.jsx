import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import dayjs from 'dayjs';
//import './App.css';


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

function MyTable(props) {
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
				{props.listOfAnswers.map( (e,index) => 
				 <tr key={index}>
            <td>{e.date.format("YYYY-MM-DD")}</td>
            <td>{e.text}</td>
            <td>{e.respondent}</td>
            <td>{e.score}</td>
            <td><Button variant="primary">Vote</Button></td>
          </tr>)}
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

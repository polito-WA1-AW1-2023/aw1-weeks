
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import MyButton from './Button.jsx';


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



function MyTable(props) {
	return (
		<table className="table">
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
					<td><button type="button" className="btn btn-primary">Vote</button></td>
				 </tr>)}
				<tr>
					<td><input type="date" name="date" /></td>
					<td><input type="text" name="text" /></td>
					<td><input type="text" name="respondent" /></td>
					<td><input type="text" size="4" name="score" /></td>
					<td><button type="button" className="btn btn-primary">+</button> </td>
				</tr>
			</tbody>
		</table>
	);
}

function App() {
	return (
		<div className="container-fluid">
			<div className="row">
				<MyHeader appName="La mia app" />
			</div>
			<main>
				<div className="row">
					<div className="col-9">
						<p>Question: Best way of enumerating an array in JS</p>
					</div>
					<div className="col-3">
						<p>Author: Enrico</p>
					</div>
				</div>
				<div className="row">
					<h2>Current Answers</h2>
					<div id="comments"></div>
				</div>
				<div className="row">
					<div id="scoretable">
						<MyTable listOfAnswers={answerList} />
					</div>
				</div>
			</main>
			<div className="row">
				<footer>
					<p>&copy; 2023, Applicazioni Web I</p>
					<div id="time"></div>
				</footer>
			</div>
		</div>
	);
}

export default App

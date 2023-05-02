import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnswerForm } from './AnswerForm';

function AnswerRow(props) {
  const { e } = props;
  return (
    <tr>
      <td>{e.date.format("YYYY-MM-DD")}</td>
      <td>{e.text}</td>
      <td>{e.respondent}</td>
      <td>{e.score}</td>
      <td><Button variant="primary" onClick={props.increaseScore}><i className='bi bi-arrow-up-circle' /></Button>
        <Link to={`/edit/${e.id}`}>
          <Button variant='secondary' className='mx-2'><i className='bi bi-pencil-square' /></Button>
        </Link>
        <Button variant="danger" onClick={props.deleteAnswer}><i className='bi bi-trash' /></Button></td>
    </tr>
  );
}

function MainAnswers(props) {

  const [objToEdit, setObjToEdit] = useState(undefined);  // state to keep the info about the object to edit

  const [sortOrder, setSortOrder] = useState('none');  // local state for visualization only, does not need to change the list in App

  const sortedAnswers = [...props.answerList];  // make a shallow copy
  // sort order is recomputed at each re-render: do NOT make a state with the sorted list!
  if (sortOrder === 'asc')
    sortedAnswers.sort((a,b) => a.score - b.score);
  else if (sortOrder === 'desc')
    sortedAnswers.sort((a,b) => b.score - a.score);
  
  const sortByScore = () => {
    setSortOrder( (oldSortOrder) => oldSortOrder === 'asc' ? 'desc' : 'asc' );
  }

  return (
    <>
      <Row>
        <Col>
          <p className='fw-bold'>Answers ({props.answerList.length}):</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover>
            {/* <Table striped bordered hover> */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Text</th>
                <th>Author</th>
                <th>Score
                  <i className={'mx-1 '+(sortOrder ==='asc' ? 'bi bi-sort-numeric-up' : 'bi bi-sort-numeric-down')} onClick={sortByScore} style={{color: 'black'}}/>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedAnswers.map((e) =>
                <AnswerRow e={e} key={e.id} increaseScore={() => props.increaseScore(e.id)}
                  editAnswer={() => { setObjToEdit(e); setShowForm(true); }}
                  deleteAnswer={() => props.deleteAnswer(e.id)} />)
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>          
          <Link to='/add'>
            <Button variant='success'>Add answer</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export { MainAnswers, AnswerRow };
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AnswerRow(props) {
  const navigate = useNavigate();

  const { e } = props;

  let statusClass = null;

  switch(e.status) {
    case 'added':
      statusClass = 'table-success';
      break;
    case 'deleted':
      statusClass = 'table-danger';
      break;
    case 'updated':
      statusClass = 'table-warning';
      break;
    default:
      break;
  }

  return (
    <tr className={statusClass}>
      <td>{e.date.format("YYYY-MM-DD")}</td>
      <td>{e.text}</td>
      <td>{e.respondent}</td>
      <td>{e.score}</td>
      <td><Button variant="primary" onClick={props.increaseScore}><i className='bi bi-arrow-up-circle' /></Button>
          <Button variant='secondary' className='mx-2' disabled={e.respondentId !== props.userId} 
            onClick={()=>{navigate(`/edit/${e.id}`)}}><i className='bi bi-pencil-square' /></Button>
        <Button variant="danger" onClick={props.deleteAnswer} disabled={e.respondentId !== props.userId}>
            <i className='bi bi-trash' /></Button></td>
    </tr>
  );
}

function MainAnswers(props) {
  
  const navigate = useNavigate();

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
                <AnswerRow e={e} userId={props.user && props.user.id} key={e.id} increaseScore={() => props.increaseScore(e.id)}
                  editAnswer={() => { setObjToEdit(e); setShowForm(true); }}
                  deleteAnswer={() => props.deleteAnswer(e.id)} />)
              }
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>          
          <Button variant='success' onClick={()=>navigate('/add')} disabled={props.user?.id? false : true}>Add answer</Button>
        </Col>
      </Row>
    </>
  )
}

export { MainAnswers, AnswerRow };
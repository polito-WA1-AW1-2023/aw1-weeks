import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import NavHeader from './NavbarComponents';

function FormRoute(props) {
    return (
        <>
            <NavHeader user={props.user} logout={props.logout} />
            <Container fluid>
                <AnswerForm answerList={props.answerList} addAnswer={props.addAnswer}
                    editAnswer={props.editAnswer} />
            </Container>
        </>
    );
}

function AnswerForm(props) {
    const navigate = useNavigate();

    /* If we have an answerId in the URL, we retrieve the answer to edit from the list.
       In a full-stack application, starting from the answerId, 
       we could query the back-end to retrieve all the answer data (updated to last value). */

    const { answerId } = useParams();
    //console.log('answerId: '+JSON.stringify(answerId));
    //console.log('props.answerList: '+JSON.stringify(props.answerList));

    const objToEdit = answerId && props.answerList.find(e => e.id === parseInt(answerId));
    //console.log('objToEdit: '+JSON.stringify(objToEdit));

    const [date, setDate] = useState(objToEdit ? objToEdit.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));  //string: dayjs object is created only on submit
    const [text, setText] = useState(objToEdit ? objToEdit.text : '');
    //const [respondent, setRespondent] = useState(objToEdit ? objToEdit.respondent : '');
    const [score, setScore] = useState(objToEdit ? objToEdit.score : 0);

    const [errorMsg, setErrorMsg] = useState('');

    /*
    function handleRespondent(event) {
        const v = event.target.value;
        setRespondent(v);
    }
    */

    const handleScore = (ev) => {
        const v = ev.target.value;
        setScore(v);
    }

    function handleSubmit(event) {
        event.preventDefault();
        //console.log('premuto submit');

        // Form validation
        if (date === '')
            setErrorMsg('Data non valida');
        else if (isNaN(parseInt(score)))
            setErrorMsg('Score non valido');
        else if (parseInt(score)<0) {
            setErrorMsg('Score negativo non valido');
        }
        else {
            const e = {
                text: text,
                //respondent: respondent,
                score: parseInt(score),
                date: dayjs(date)
            }
            //console.log(e);

            if (objToEdit) {  // decide if this is an edit or an add
                e.id = objToEdit.id;
                props.editAnswer(e);
            } else {
                props.addAnswer(e);
            }
            navigate('/');
        }
    }

    return (
        <>
        {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={date} onChange={ev => setDate(ev.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" name="text" value={text} onChange={ev => setText(ev.target.value)} />
            </Form.Group>

            {/*<Form.Group className='mb-3'>
                <Form.Label>Respondent</Form.Label>
                <Form.Control type="text" name="respondent" value={respondent} onChange={handleRespondent} />
            </Form.Group>
            */}

            <Form.Group className='mb-3'>
                <Form.Label>Score</Form.Label>
                <Form.Control type="number" name="score" value={score} onChange={handleScore} />
            </Form.Group>

            <Button type='submit' variant="primary">{objToEdit? 'Save' : 'Add'}</Button> 
            {/* alternative
            <Button className='mx-2' variant='danger' onClick={()=>navigate('/')}>Cancel</Button> */}
            <Link to='/'>
                <Button className='mx-2' variant='danger'>Cancel</Button>
            </Link>
        </Form>
        </>
    );

}

export { AnswerForm, FormRoute };




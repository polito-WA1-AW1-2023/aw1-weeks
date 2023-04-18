import { Col, Container, Row, Button, Form, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';

function AnswerForm(props) {
    const [date, setDate] = useState('');
    const [text, setText] = useState('');
    const [respondent, setRespondent] = useState('');
    const [score, setScore] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    function handleRespondent(event) {
        const v = event.target.value;
        setRespondent(v);
    }

    const handleScore = (ev) => {
        const v = ev.target.value;
        setScore(v);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('premuto submit');

        // Form validation
        if (date === '')
            setErrorMsg('Data non valida');
        else if (isNaN(parseInt(score)))
            setErrorMsg('Score non valido');
        else {
            const e = {
                text: text,
                respondent: respondent,
                score: parseInt(score),
                date: dayjs(date)
            }
            console.log(e);
        }
    }

    return (
        <>
        {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={date} onChange={ev => setDate(ev.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Text</Form.Label>
                <Form.Control type="text" name="text" value={text} onChange={ev => setText(ev.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Respondent</Form.Label>
                <Form.Control type="text" name="respondent" value={respondent} onChange={handleRespondent} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control type="number" name="score" value={score} onChange={handleScore} />
            </Form.Group>

            <Button type='submit' variant="primary">Add</Button>
        </Form>
        </>
    );

}

export default AnswerForm;




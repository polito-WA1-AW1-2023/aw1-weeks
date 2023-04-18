import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { useState } from 'react';

function AnswerForm(props) {
    const [text, setText] = useState('');
    const [respondent, setRespondent] = useState('Enrico');
 
    function handleRespondent(event) {
        const v = event.target.value;
        setRespondent(v.toUpperCase());
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" />
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
                <Form.Control type="text" name="score" />
            </Form.Group>

            <Button type='submit' variant="primary">Add</Button>
        </Form>
    );

}

export default AnswerForm;




import { Row, Col} from 'react-bootstrap';



function QuestionDescription(props) {
    return (
        <Row>
            <Col xs={9}>
                <p className='fs-4'>Question: {props.question.text}</p>
            </Col>
            <Col xs={3}>
                <p className='fs-5'>Asked by: <span className="badge text-bg-secondary text-end">{props.question.author}</span></p>
            </Col>
        </Row>       
    );
}

export default QuestionDescription;
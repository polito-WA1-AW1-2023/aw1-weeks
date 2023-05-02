import { Col, Container, Row, Button, Form, Table } from 'react-bootstrap';
import { MainAnswers } from './AnswerComponents';
import NavHeader from './NavbarComponents';
import QuestionDescription from './QuestionComponents';

function AnswerRoute(props) {
    return (
      <>
        <NavHeader />
        <Container fluid>
          <QuestionDescription question={props.question} />
          <MainAnswers answerList={props.answerList} increaseScore={props.increaseScore}
            deleteAnswer={props.deleteAnswer} addAnswer={props.addAnswer} editAnswer={props.editAnswer} />
        </Container>
      </>
    );
}

export default AnswerRoute;
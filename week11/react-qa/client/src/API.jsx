/**
 * All the API calls
 */

import dayjs from "dayjs";

const URL = 'http://localhost:3001/api';

async function getAllQuestions() {
  // call  /api/questions
  const response = await fetch(URL+'/questions');
  const questions = await response.json();
  if (response.ok) {
    return questions.map((e) => ({id: e.id, text:e.text, author:e.author, date: dayjs(e.date)}) )
  } else {
    throw questions;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getQuestion(id) {
    // call  /api/questions/<id>
    const response = await fetch(URL+`/questions/${id}`);
    const question = await response.json();
    if (response.ok) {
      const e = question;
      return {id: e.id, text: e.text, author: e.author, date: dayjs(e.date)};
    } else {
      throw question;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
  }

async function getAnswersByQuestionId(id) {
    // call  /api/questions/<id>/answers
    const response = await fetch(URL+`/questions/${id}/answers`);
    const answers = await response.json();
    if (response.ok) {
      return answers.map((e) => ({id: e.id, text: e.text, respondent: e.respondent, score: e.score, date: dayjs(e.date), questionId: e.questionId}) );
    } else {
      throw answers;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
  }



const API = {getAllQuestions, getQuestion, getAnswersByQuestionId};
export default API;
import React, { useEffect, useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StudentQuestionCard from "../../../components/question/StudentQuestionCard";

function StudentExamDetails() {
  const params = useParams();
  const [savedQuestions, setSavedQuestions] = useState([]);

  async function fetchQuestions() {
    let res = await fetch(
      "http://localhost:8081/question/findQuestionsByExamId",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          examId: params.id,
        }),
      }
    );
    let resJson = await res.json();
    if (res.status === 200) {
      setSavedQuestions(resJson);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Container>
      <Row>
        {savedQuestions &&
          savedQuestions.map((question) => (
            <Form key={question.questionId}>
              <StudentQuestionCard
                key={question.questionId}
                question={question}
              />
            </Form>
          ))}
      </Row>
    </Container>
  );
}

export default StudentExamDetails;

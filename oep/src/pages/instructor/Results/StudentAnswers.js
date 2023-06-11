import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import CustomAlert from "../../../components/alert/CustomAlert";

function StudentAnswers() {
  const params = useParams();

  const [alertProps, setShowAlertProps] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [grade, setGrade] = useState();

  async function fetchQuestions() {
    let res = await fetch(
      "http://localhost:8081/question/findQuestionsByExamId",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          examId: params.examid,
        }),
      }
    );
    let resJson = await res.json();
    if (res.status === 200) {
      setQuestions(resJson);
      console.log(resJson);
      let fetchAnswers = await fetch(
        "http://localhost:8081/studentAnswer/findStudentAnswersByQuestion",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            studentId: params.studentId,
            questionsId: resJson.map((item) => item.questionId),
          }),
        }
      );
      let answersJson = await fetchAnswers.json(); // Await the response
      if (fetchAnswers.status === 200) {
        setAnswers(answersJson);
      }
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (answers.length > 0 && questions.length > 0) {
      const combined = questions.reduce((combinedList, question) => {
        const matchingAnswer = answers.find(
          (answer) => answer && answer.questionId === question.questionId
        );
        if (matchingAnswer) {
          combinedList.push({ ...question, ...matchingAnswer });
        } else {
          combinedList.push({ ...question, answerText: "BOŞ" });
        }
        return combinedList;
      }, []);
      setCombinedList(combined);
    }
  }, [answers, questions]);

  async function saveGrade() {
    let res = await fetch("http://localhost:8081/examResult/createResult", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        examId: params.examid,
        studentId: params.studentId,
        grade: grade,
      }),
    });

    if (res.status === 200) {
      setShowAlertProps({
        heading: "Başarılı",
        message: "Notlandırma başarılı",
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Soru</th>
            <th>Puanı</th>
            <th>Öğrencinin cevabı</th>
          </tr>
        </thead>
        <tbody>
          {combinedList &&
            combinedList.map((item, index) => (
              <tr key={index}>
                <td>{item.text}</td>
                <td>{item.point}</td>
                <td>{item.answerText}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Row style={{ paddingTop: "3rem" }}>
        <InputGroup className="mb-3" style={{ width: "10rem" }}>
          <Form.Control
            style={{ height: "50px", width: "20px" }}
            placeholder="Not"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            onClick={saveGrade}
          >
            Notlandır
          </Button>
        </InputGroup>
      </Row>
      <Row>
        {showAlert && (
          <CustomAlert
            heading={alertProps.heading}
            message={alertProps.message}
            variant={alertProps.variant}
          />
        )}
      </Row>
    </Container>
  );
}

export default StudentAnswers;

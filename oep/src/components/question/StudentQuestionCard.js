import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormCheck, ListGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "./questionCard.css";
import { Context } from "../context/AuthContext";
import CustomAlert from "../alert/CustomAlert";

function StudentQuestionCard({ question }) {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedAnswerText, setSelectedAnswerText] = useState("");
  const { user } = useContext(Context);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setShowAlertProps] = useState();

  async function saveAnswer() {
    let res = await fetch(
      "http://localhost:8081/studentAnswer/createAndUpdateStudentAnswer",
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          studentId: user.studentId,
          questionId: question.questionId,
          answerId: selectedAnswer,
          answerText: selectedAnswerText,
        }),
      }
    );
    if (res.status === 200) {
      console.log("başarılı");

      setShowAlertProps({
        heading: "Başarılı",
        message: "Cevap başarıyla kaydedildi",
        variant: "success",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      console.log("başarısız");

      setShowAlertProps({
        heading: "Hata",
        message: "Cevap kaydedilemedi",
        variant: "danger",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }

  async function fetchAnswers() {
    let res = await fetch(
      "http://localhost:8081/answer/findAnswersByQuestionId",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          questionId: question.questionId,
        }),
      }
    );

    let resJson = await res.json();
    if (res.status === 200) {
      setAnswers(resJson);
    }
  }

  useEffect(() => {
    fetchAnswers();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer.answerId);
    setSelectedAnswerText(answer.text);
  };

  return (
    <Container>
      <Card
        className="question-card"
        style={{
          border: "none",
          paddingLeft: "10rem",
          paddingRight: "10rem",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#e9444a",
            color: "white",
            border: "none",
            height: "4rem",
            textAlign: "center",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        >
          {question.text} ({question.type})
        </Card.Header>
        <ListGroup>
          {answers.map((answer) => (
            <ListGroup.Item
              key={answer.answerId}
              variant="flush"
              style={{ borderRadius: "15px" }}
            >
              <Form.Check>
                <input
                  type="checkbox"
                  checked={selectedAnswer === answer.answerId}
                  name="answer"
                  id={`answer-${answer.answerId}`}
                  style={{ marginRight: "1rem" }}
                  onChange={() => handleAnswerSelection(answer)}
                />
                <FormCheck.Label htmlFor={`answer-${answer.answerId}`}>
                  {answer.text}
                </FormCheck.Label>
              </Form.Check>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {question.type === "classic" ? (
          <Form.Control
            as="textarea"
            onChange={(e) => setSelectedAnswerText(e.target.value)}
          ></Form.Control>
        ) : (
          undefined
        )}
        <Col>
          <Button
            onClick={() => {
              saveAnswer();
            }}
            variant="outline-danger"
            style={{ Color: "#4b74f4" }}
          >
            Cevabı Kaydet
          </Button>
        </Col>
      </Card>
      {showAlert && (
        <CustomAlert
          heading={alertProps.heading}
          message={alertProps.message}
          variant={alertProps.variant}
        />
      )}
    </Container>
  );
}

export default StudentQuestionCard;

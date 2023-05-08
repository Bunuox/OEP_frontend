import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormCheck,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Container } from "react-bootstrap";
import "./questionCard.css";

function QuestionCard({ question }) {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();

  const [showAddAnswer, setShowAddAnswer] = useState(false);
  const [createdAnswerText, setCreatedAnswerText] = useState();

  const checkboxRef = useRef();

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

  async function createAnswer() {
    let res = await fetch("http://localhost:8081/answer/createAnswer", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        questionId: question.questionId,
        text: createdAnswerText,
        isCorrect: checkboxRef.current.checked,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      console.log(resJson);
      window.location.reload(false);
    }
  }

  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleAnswerSelection = (answer) => {
    console.log(answer);
    setSelectedAnswer(answer.answerId);
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
            backgroundColor: "#507cff",
            color: "white",
            border: "none",
            height: "4rem",
            textAlign: "center",
            borderRadius: "15px",
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
        {question.type === "multiple choice" ? (
          <Col>
            <Button
              onClick={() => {
                setShowAddAnswer(true);
              }}
              variant="outline-primary"
              style={{ Color: "#4b74f4" }}
            >
              Cevap Ekle
            </Button>
            <Button variant="danger">Cevabı sil</Button>
          </Col>
        ) : (
          undefined
        )}
      </Card>

      <Modal
        show={showAddAnswer}
        onHide={() => {
          setShowAddAnswer(false);
        }}
      >
        <Modal.Header closeButton>Cevap Oluştur</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Cevap: </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCreatedAnswerText(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col sm={1}>
                  <div className="mb-3">
                    <Form.Check
                      type="checkbox"
                      ref={checkboxRef}
                      id="correct-answer-checkbox"
                    />
                  </div>
                </Col>
                <Col>
                  <p>Doğru şık</p>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createAnswer}>
            Kaydet
          </Button>
          <Button variant="secondary">Vazgeç</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default QuestionCard;

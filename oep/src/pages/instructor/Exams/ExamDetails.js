import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../../../components/question/QuestionCard";
import { Button, Container, Form, Row, Col, Modal } from "react-bootstrap";

function InstructorExamDetails() {
  const params = useParams();

  const [savedQuestions, setSavedQuestions] = useState([]);

  const [showCreateQuestion, setShowCreateQuestion] = useState(false);

  const [questionText, setQuestionText] = useState();
  const [questionType, setQuestionType] = useState();
  const [questionPoint, setQuestionPoint] = useState();

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

  async function createQuestion() {
    let res = await fetch("http://localhost:8081/question/createQuestion", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        examId: params.id,
        text: questionText,
        type: questionType,
        point: questionPoint,
      }),
    });
    if (res.status === 200) {
      console.log("soru oluşturuldu");
      window.location.reload(false);
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
              <QuestionCard key={question.questionId} question={question} />
            </Form>
          ))}
      </Row>
      <Row>
        <Col>
          <Button
            style={{ margin: "1rem", backgroundColor: "#4162cf" }}
            onClick={() => {
              setShowCreateQuestion(true);
            }}
          >
            Soru Ekle
          </Button>
        </Col>
      </Row>
      <Modal
        show={showCreateQuestion}
        onHide={() => {
          setShowCreateQuestion(false);
        }}
      >
        <Modal.Header>Soru Oluştur</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Soru </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setQuestionText(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Soru Tipi</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setQuestionType(e.target.value);
                }}
              >
                <option>Soru tipini seçin</option>
                <option value="multiple choice">Çoktan seçmeli</option>
                <option value="classic">Klasik</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Soru puanı</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => {
                  setQuestionPoint(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowCreateQuestion(false);
            }}
          >
            Vazgeç
          </Button>
          <Button onClick={createQuestion}>Soruyu ekle</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default InstructorExamDetails;

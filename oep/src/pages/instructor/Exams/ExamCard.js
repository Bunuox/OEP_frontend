import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

function InstructorExamCard({ exam }) {
  const navigate = useNavigate();
  return (
    <Container>
      <Card
        className="card"
        style={{ width: "20rem", height: "fit-content" }}
        bg={"Light"}
        text={"black"}
      >
        <Card.Header
          as="h5"
          className="d-flex flex-column align-items-center"
          style={{ backgroundColor: "#4b74f4", color: "white" }}
        >
          <FaPencilAlt />
          <div className="card-header-id"> {exam.examName}</div>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Ders ID: ${exam.courseId}`}</Card.Subtitle>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Sınac ID: ${exam.examId}`}</Card.Subtitle>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Sınav tarihi: ${exam.examDate}`}</Card.Subtitle>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Sınav saati: ${exam.examTime}`}</Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="d-flex flex-column justify-content-end"
            onClick={() => {
              let path = "/instructor/exams/" + exam.examId;
              navigate(path);
            }}
          >
            Soruları Görüntüle / Ekle
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default InstructorExamCard;

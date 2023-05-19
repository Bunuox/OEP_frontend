import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { InstructorContext } from "../context/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";

function InstructorExamList() {
  const [exams, setExams] = useState([]);
  const { instructor } = useContext(InstructorContext);

  async function fetchExams() {
    let res = await fetch("http://localhost:8081/instructor/instructorExams", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        instructorId: instructor.instructorId,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setExams(resJson);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container>
      <Card style={{ height: "20rem" }}>
        <Card.Header>Sınavlarım</Card.Header>
        <Card.Body>
          <ListGroup style={{ maxHeight: "15rem", overflowY: "auto" }}>
            {exams &&
              exams.map((exam) => (
                <>
                  <ListGroup.Item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h6>{exam.examName}</h6>
                      <p>Tarih: {exam.examDate}</p>
                    </div>
                  </ListGroup.Item>
                </>
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InstructorExamList;

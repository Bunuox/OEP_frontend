import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

function ExamStudentList() {
  const params = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  async function findStudents() {
    let res = await fetch("http://localhost:8081/take/findTakeByCourseId", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        courseId: params.courseId,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setStudents(resJson);
    }
  }

  useEffect(() => {
    findStudents();
  }, []);
  return (
    <Container>
      <ListGroup style={{ width: "80%" }}>
        {students &&
          students.map((student, index) => (
            <>
              <ListGroup.Item key={index}>
                <Row>
                  <Col>
                    <h6>{student.firstName}</h6>
                  </Col>
                  <Col>
                    <h6>Not: </h6>
                  </Col>
                </Row>
                <Row>
                  <Button
                    onClick={() => {
                      let path =
                        window.location.pathname + "/" + student.studentId;
                      navigate(path);
                    }}
                    style={{ width: "6rem", fontSize: "10px" }}
                  >
                    Sonuçları gör
                  </Button>
                </Row>
              </ListGroup.Item>
            </>
          ))}
      </ListGroup>
    </Container>
  );
}

export default ExamStudentList;

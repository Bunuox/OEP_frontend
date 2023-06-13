import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

function ExamStudentList() {
  const params = useParams();
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [mergedList, setMergedList] = useState([]);
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
      let examResultFetchRes = await fetch(
        "http://localhost:8081/examResult/findExamResultsByExamId",
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
      let examResultFetchResJson = await examResultFetchRes.json();
      if (examResultFetchRes.status === 200) {
        setResults(examResultFetchResJson);
      }
    }
  }
  useEffect(() => {
    findStudents();
  }, []);

  useEffect(() => {
    const merged = students.map((student) => {
      const result = results.find(
        (result) => result.studentId === student.studentId
      );
      const grade = result ? result.grade : "Notlandırılmadı";
      return {
        ...student,
        grade,
      };
    });
    setMergedList(merged);
  }, [students, results]);

  return (
    <Container>
      <ListGroup style={{ width: "80%" }}>
        {mergedList.map &&
          mergedList.map((student, index) => (
            <>
              <ListGroup.Item key={index}>
                <Row>
                  <Col>
                    <h6>
                      {student.firstName} {student.lastName}
                    </h6>
                  </Col>
                  <Col>
                    <h6>Not: {student.grade}</h6>
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

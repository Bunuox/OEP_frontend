import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Context } from "../context/AuthContext";
import ListGroup from "react-bootstrap/ListGroup";

function StudentExamsListCard() {
  const [exams, setExams] = useState([]);
  const { user } = useContext(Context);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  function filterExams(exams) {
    return exams.filter((exam) => {
      const examDate = new Date(exam.examDate);
      return (
        examDate.getMonth() + 1 === currentMonth &&
        examDate.getFullYear() === currentYear
      );
    });
  }

  async function fetchExams() {
    let res = await fetch("http://localhost:8081/student/findStudentExams", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        studentId: user.studentId,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setExams(filterExams(resJson));
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container>
      <Card style={{ height: "17rem" }}>
        <Card.Header>Yaklaşan Sınavlar</Card.Header>
        <Card.Body>
          <ListGroup style={{ maxHeight: "12rem", overflowY: "auto" }}>
            {exams &&
              exams.map((exam) => (
                <>
                  <ListGroup.Item>
                    {exam.examName} - {exam.examDate}
                  </ListGroup.Item>
                </>
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentExamsListCard;

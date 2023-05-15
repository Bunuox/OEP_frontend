import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StudentCoursesCard from "../../components/card/StudentCoursesCard";
import StudentExamsListCard from "../../components/card/StudentExamsListCard";
import { Context } from "../../components/context/AuthContext";
import StudentInformationCard from "../../components/card/StudentInformationCard";

function Student() {
  const [student, setStudent] = useState();
  const { user } = useContext(Context);

  async function fetchUser() {
    try {
      let res = await fetch("http://localhost:8081/student/findStudent", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setStudent(resJson);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <StudentCoursesCard />
        </Col>
        <Col>
          <StudentExamsListCard />
        </Col>
      </Row>
      {student && (
        <Row>
          <StudentInformationCard student={student.student} />
        </Row>
      )}
    </Container>
  );
}

export default Student;

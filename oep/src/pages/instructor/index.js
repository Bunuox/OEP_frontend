import React, { useContext, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import InstructorCoursesCard from "../../components/card/InstructorCoursesCard";
import InstructorExamList from "../../components/card/InstructorExamListCard";
import InstructorInformationCard from "../../components/card/InstructorInformationCard";
import { InstructorContext } from "../../components/context/AuthContext";

function Instructor() {
  const [instructorFetch, setInstructorFetch] = useState("");
  const { instructor } = useContext(InstructorContext);
  async function fetchUser() {
    try {
      let res = await fetch("http://localhost:8081/instructor/findInstructor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: instructor.email,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setInstructorFetch(resJson);
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
          <InstructorCoursesCard />
        </Col>
        <Col>
          <InstructorExamList />
        </Col>
      </Row>
      <Row>
        {instructorFetch && (
          <InstructorInformationCard instructor={instructorFetch} />
        )}
      </Row>
    </Container>
  );
}

export default Instructor;

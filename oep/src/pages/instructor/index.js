import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import InstructorCoursesCard from "../../components/card/InstructorCoursesCard";
import InstructorExamList from "../../components/card/InstructorExamListCard";
function Instructor() {
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
      <Row></Row>
    </Container>
  );
}

export default Instructor;

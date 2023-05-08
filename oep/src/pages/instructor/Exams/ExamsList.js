import React from "react";
import { Col, Row } from "react-bootstrap";
import InstructorExamCard from "./ExamCard";

import "./exam.css";

function InstructorExamsList({ exams }) {
  return (
    <Row>
      {exams.map((exam) => (
        <>
          <Col sm={4} key={exam.examId}>
            <InstructorExamCard exam={exam} />
          </Col>
        </>
      ))}
    </Row>
  );
}

export default InstructorExamsList;

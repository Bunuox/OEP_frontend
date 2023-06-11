import React from "react";
import { Col, Row } from "react-bootstrap";

import "../Exams/exam.css";
import InstructorGradeExamDetailsCard from "./GradeExamDetailsCard";

function InstructorGradeExamsList({ exams }) {
  return (
    <Row>
      {exams.map((exam) => (
        <>
          <Col sm={4} key={exam.examId}>
            <InstructorGradeExamDetailsCard exam={exam} />
          </Col>
        </>
      ))}
    </Row>
  );
}

export default InstructorGradeExamsList;

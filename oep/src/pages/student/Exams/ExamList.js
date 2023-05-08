import React from "react";
import { Col, Row } from "react-bootstrap";
import InstructorExamCard from "./ExamCard";

function StudentExamList({ exams }) {
  return (
    <Row>
      {exams.map((exam) => (
        <>
          <Col sm={4}>
            <InstructorExamCard exam={exam} key={exam.examId} />
          </Col>
        </>
      ))}
    </Row>
  );
}

export default StudentExamList;

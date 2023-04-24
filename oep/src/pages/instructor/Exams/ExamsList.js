import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function InstructorExamsList({ exams }) {
  return (
    <>
      {exams.map((exam) => (
        <ListGroup key={exam.examId} horizontal>
          <ListGroup.Item>Exam ID: {exam.examId}</ListGroup.Item>
          <ListGroup.Item>Course ID: {exam.courseId}</ListGroup.Item>
          <ListGroup.Item>Exam Name: {exam.examName}</ListGroup.Item>
          <ListGroup.Item>{exam.examDate}</ListGroup.Item>
        </ListGroup>
      ))}
    </>
  );
}

export default InstructorExamsList;

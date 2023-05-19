import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsBookHalf } from "react-icons/bs";
import "./courses.css";

function StudentCourseCard({ courses }) {
  return (
    <Row>
      {courses.map((course) => (
        <Col sm={4} key={course.courseId}>
          <Card className="card" style={{ width: "20rem" }} text={"black"}>
            <Card.Header
              as="h5"
              className="d-flex flex-column align-items-center"
              style={{ backgroundColor: "#e9444a" }}
            >
              <BsBookHalf color="whitesmoke" />
              <div className="card-header-id">Course ID: {course.courseId}</div>
            </Card.Header>
            <Card.Body>
              <Card.Title className="d-flex flex-column justify-content-end">
                {course.courseName}
              </Card.Title>
              <Card.Text>{course.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default StudentCourseCard;

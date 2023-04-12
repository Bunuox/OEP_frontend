import React from "react";
import { Card, Col, Row } from "react-bootstrap";
function CourseCard({ courses }) {
  return (
    <Row>
      {courses.map((course) => (
        <Col sm={4} key={course.courseId}>
          <Card
            className="card"
            style={{ width: "20rem" }}
            bg={"success"}
            text={"white"}
          >
            <Card.Header as="h5">{course.courseId}</Card.Header>
            <Card.Body>
              <Card.Title className="d-flex flex-column justify-content-end align-items-center">
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

export default CourseCard;

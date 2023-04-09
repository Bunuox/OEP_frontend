import React from "react";
import { Card } from "react-bootstrap";
function CourseCard({ courseId, courseTitle, courseDescription }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{courseId}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {courseDescription}
        </Card.Subtitle>
        <Card.Text>Açıklama</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;

import React from "react";
import { Card, Container, ListGroup } from "react-bootstrap";

function InstructorInformationCard({ instructor }) {
  return (
    <Container>
      <Card style={{ height: "fit-content" }}>
        <Card.Header>Bilgilerim</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Ad: {instructor.firstName}</ListGroup.Item>
            <ListGroup.Item>Soyad: {instructor.lastName}</ListGroup.Item>
            <ListGroup.Item>Email: {instructor.email}</ListGroup.Item>
            <ListGroup.Item>
              Doğum Tarihi: {instructor.dateOfBirth}
            </ListGroup.Item>
            <ListGroup.Item>Departmanı: {instructor.department}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InstructorInformationCard;

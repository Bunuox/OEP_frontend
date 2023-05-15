import React from "react";
import { Card, Container, ListGroup } from "react-bootstrap";

function StudentInformationCard({ student }) {
  console.log(student);
  return (
    <Container>
      <Card style={{ height: "fit-content" }}>
        <Card.Header>Bilgilerim</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Ad: {student.firstName}</ListGroup.Item>
            <ListGroup.Item>Soyad: {student.lastName}</ListGroup.Item>
            <ListGroup.Item>
              Kimlik Numarası: {student.identificationNo}
            </ListGroup.Item>
            <ListGroup.Item>Email: {student.email}</ListGroup.Item>
            <ListGroup.Item>Doğum Tarihi: {student.dateOfBirth}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentInformationCard;

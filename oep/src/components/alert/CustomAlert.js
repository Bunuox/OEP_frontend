import React from "react";
import { Alert } from "react-bootstrap";

function CustomAlert({ heading, message, variant }) {
  return (
    <Alert show={true} variant={variant} class="alert">
      <Alert.Heading class="alert-heading">{heading}</Alert.Heading>
      <p>{message}.</p>
      <hr />
    </Alert>
  );
}

export default CustomAlert;

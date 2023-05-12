import React from "react";
import { Alert } from "react-bootstrap";

function CustomAlert({ heading, message, variant }) {
  return (
    <Alert
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: "5px",
        fontSize: "14px",
        height: "5rem",
      }}
      show={true}
      variant={variant}
    >
      <Alert.Heading class="alert-heading">{heading}</Alert.Heading>
      <p>{message}.</p>
    </Alert>
  );
}

export default CustomAlert;

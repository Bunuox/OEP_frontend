import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <Container>
      <h1>404</h1>
      <h2>Sayfa bulunamadı.</h2>
      <Link to="/student">Anasayfaya dön</Link>
    </Container>
  );
}

export default Page404;

import React from "react";
import Container from "react-bootstrap/esm/Container";
import OepBrand from "../../components/Brand/OepBrand";
import Button from "../../components/button/Button";
import RegisterForm from "../../components/form/RegisterForm";
import Input from "../../components/input/Input";
import { Row, Col, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const handleClick = () => {
  console.log(
    "Şifre, hesabınız onaylandıktan sonra mail adresinize iletilecektir."
  );
};

function RegisterPage() {
  return (
    <body>
      <OepBrand />
      <Container fluid="md">
        <RegisterForm>
          <h3>Kayıt ol</h3>
          <div>
            <Row>
              <Col>
                <Input id="fName" type={"text"} placeholder={"İsim"}></Input>
              </Col>
              <Col>
                <Input
                  id="idNo"
                  type={"text"}
                  placeholder={"T.C. Kimlik Numarası"}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input id="lName" type={"text"} placeholder={"Soyisim"}></Input>
              </Col>
              <Col>
                <Stack direction="horizontal">
                  <Col>
                    <label>Doğum tarihi</label>
                  </Col>
                  <Col>
                    <Col>
                      <Input
                        id="dogumTarihi"
                        type={"date"}
                        value=""
                        placeholder={"dd-mm-yyyy"}
                      ></Input>
                    </Col>
                  </Col>
                </Stack>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input id="eMail" type={"text"} placeholder={"Email"}></Input>
              </Col>
              <Col>
                <Stack direction="horizontal">
                  <Col xs={4}>
                    <label for="cinsiyet">Cinsiyet</label>
                  </Col>
                  <Col xs={8}>
                    <Form.Select name="cinsiyet" id="cinsiyet" size="sm">
                      <option value="e">Erkek</option>
                      <option value="k">Kadın</option>
                      <option value="n">Belirtmek istemiyorum</option>
                    </Form.Select>
                  </Col>
                </Stack>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className={"button-secondary"}
                  onClick={handleClick}
                >
                  Kayıt ol
                </Button>
              </Col>
            </Row>
          </div>
        </RegisterForm>
      </Container>
    </body>
  );
}

export default RegisterPage;

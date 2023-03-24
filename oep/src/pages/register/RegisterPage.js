import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import OepBrand from '../../components/Brand/OepBrand'
import Button from '../../components/button/Button'
import RegisterForm from '../../components/form/RegisterForm'
import Input from '../../components/input/Input'
import { Row, Col, Stack } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function RegisterPage() {

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [idNo, setIdNo] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());

    let handleSubmit = async (e) => {
        console.log("firstName => " + fName);
        console.log("lastName => " + lName);
        console.log("tcKimlikNo => " + idNo);
        console.log("dogumTarihi => " + birthDate);
        console.log("dogumTarihi => " + birthDate.toISOString());
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8081/student/createStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: fName,     
                    lastName: lName,
                    identificationNo: idNo,  
                    dateOfBirth: birthDate.toISOString()
                }),
            });
            console.log(fName);
            let resJson = await res.json();
            if (res.status === 200) {
                setFName("");
                setLName("");
                console.log("başarılı")
            } else {
                console.log("başarısız")
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
            <Container fluid="md">
                <RegisterForm onSubmit={handleSubmit}>
                    <h3>Kayıt ol</h3>
                    <div>
                        <Row>
                            <Col>
                                <Input
                                    id="fName"
                                    type={"text"}
                                    value={fName}
                                    onChange={
                                        (e) =>{setFName(e.target.value);}
                                    }
                                    placeholder={"İsim"}
                                ></Input>
                            </Col>
                            <Col>
                                <Input
                                    id="idNo"
                                    type={"text"}
                                    value={idNo}
                                    onChange={(e) => setIdNo(e.target.value)}
                                    placeholder={"T.C. Kimlik Numarası"}
                                ></Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input
                                    id="lName"
                                    type={"text"}
                                    value={lName}
                                    onChange={(e) => setLName(e.target.value)}
                                    placeholder={"Soyisim"}
                                ></Input>
                            </Col>
                            <Col>
                                <Stack direction='horizontal'>
                                    <Col>
                                        <label>Doğum tarihi</label>
                                    </Col>
                                    <Col>
                                        <Col>
                                            <Input id="birthDate" 
                                            type={"date"} 
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(new Date(e.target.value))}
                                            placeholder={"dd-mm-yyyy"}></Input>
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
                                        <label htmlFor="cinsiyet">Cinsiyet</label>
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
                                    type = "submit"
                                    onClick={handleSubmit}
                                    className={"button-secondary"}
                                >Kayıt ol
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </RegisterForm>
            </Container>
    )
}

export default RegisterPage
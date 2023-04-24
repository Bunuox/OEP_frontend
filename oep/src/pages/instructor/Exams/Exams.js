import React, { useState, useContext } from "react";
import { Container, Button, InputGroup, Col, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { InstructorContext } from "../../../components/context/AuthContext";

function InstructorExams() {
  const [showModal, setShowModal] = useState(false);
  const { instructor } = useContext(InstructorContext);
  const [fetchSemester, setFetchSemester] = useState("2022-2023");

  ///// Exam Variables /////
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [examAffect, setexamAffect] = useState(0);
  const [examDuration, setExamDuration] = useState(null);
  const [examCourseId, setExamCourseId] = useState(null);
  const [examSemester, setExamSemester] = useState("2022-2023");

  const handleModalClose = () => setShowModal(false);

  const saveExamHandle = async (e) => {
    e.preventDefault();
    try {
      let matchCheck = await fetch(
        "http://localhost:8081/teach/findTeachByCourseId",
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            courseId: examCourseId,
          }),
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          if (data.instructorId === instructor.instructorId) {
            let res = await fetch("http://localhost:8081/exam/createExam", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                courseId: examCourseId,
                instructorId: instructor.instructorId,
                examName: examName,
                examDate: examDate,
                examDuration: examDuration,
                affect: examAffect,
                examDescription: examDescription,
                examTime: examTime + ":00",
              }),
            });
            if (res.status === 200) {
              console.log("Sınav başarıyla oluşturuldu.");
            }
          } else {
            console.log("Kurs başka hocaya ait.");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Dropdown
        className="inline"
        align={{ lg: "start" }}
        style={{ marginBottom: "3rem" }}
      >
        <Dropdown.Toggle variant="" id="dropdown-basic">
          {fetchSemester}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setFetchSemester("2022-2023");
            }}
            style={{ fontSize: "15px" }}
          >
            2022-2023
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button
        style={{ backgroundColor: "#507cff" }}
        onClick={() => {
          setShowModal(true);
        }}
      >
        Sınav oluştur
      </Button>

      <Modal show={showModal} onHide={handleModalClose} size="xs">
        <Modal.Header closeButton>
          <Modal.Title>Sınav oluştur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="createExam.examName">
              <Form.Label className="form-label">Sınav adı</Form.Label>
              <Form.Control
                type="text"
                rows={3}
                onChange={(e) => setExamName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.examDescription">
              <Form.Label className="form-label">Sınav açıklaması</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={100}
                rows={3}
                onChange={(e) => setExamDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.examDate">
              <Form.Label className="form-label">Sınav tarihi</Form.Label>
              <Form.Control
                type="date"
                rows={3}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.examTime">
              <Form.Label className="form-label">Sınav saati</Form.Label>
              <Form.Control
                type="time"
                rows={3}
                onChange={(e) => {
                  setExamTime(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.examAffect">
              <Form.Label className="form-label">Sınavın etkisi (%)</Form.Label>
              <InputGroup>
                <Col xs={10}>
                  <Form.Range
                    max={100}
                    min={1}
                    value={examAffect}
                    onChange={(e) => setexamAffect(e.target.value)}
                  ></Form.Range>
                </Col>
                <Col xs={2}>
                  <Form.Control
                    readOnly
                    disabled
                    type="number"
                    value={examAffect}
                    max={100}
                    style={{ marginLeft: "10px" }}
                  ></Form.Control>
                </Col>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.examDuration">
              <Form.Label className="form-label">Sınav süresi</Form.Label>
              <InputGroup>
                <InputGroup.Text>DK</InputGroup.Text>
                <Form.Control
                  type="number"
                  onChange={(e) => setExamDuration(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.courseId">
              <Form.Label className="form-label">Ders ID</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setExamCourseId(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="createExam.examSemester">
              <Form.Label className="form-label">Sınav Dönemi</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setExamCourseId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Kapat
          </Button>
          <Button
            style={{ backgroundColor: "#507cff" }}
            onClick={saveExamHandle}
          >
            Dersi Oluştur
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default InstructorExams;

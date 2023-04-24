import React, { useContext, useState, useEffect } from "react";
import { Alert, Button, Container, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./courses.css";
import CourseCard from "./CourseCard";
import { InstructorContext } from "../../../components/context/AuthContext";

function Courses() {
  //Modal variables
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Data, context variables
  const { instructor } = useContext(InstructorContext);
  const [courses, setCourses] = useState([]);
  const [semesterCourses, setSemesterCourses] = useState([]);
  const [fetchSemester, setFetchSemester] = useState("2022-2023");

  //Create course variables
  const [courseSemester, setCourseSemester] = useState("2022-2023");
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");

  async function fetchTeach() {
    let res = await fetch(
      "http://localhost:8081/instructor/instructorCourses",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          instructorId: instructor.instructorId,
        }),
      }
    );
    let resJson = await res.json();
    if (res.status === 200) {
      console.log(resJson);
      setCourses(resJson);
      setSemesterCourses(
        resJson.filter((course) =>
          course.courseSemester.includes(fetchSemester)
        )
      );
    }
  }

  useEffect(() => {
    fetchTeach();
  }, []);

  useEffect(() => {
    setSemesterCourses(
      courses.filter((course) => course.courseSemester.includes(fetchSemester))
    );
  }, fetchSemester);

  const saveHandle = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8081/course/createCourse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          courseName: courseName,
          courseSemester: courseSemester,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Course tablosuna başarıyla kayıt eklendi.");
        handleClose();
        setShowAlert(true);

        //Create Teach for course and instructor
        let res2 = await fetch("http://localhost:8081/teach/createTeach", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            instructorId: instructor.instructorId,
            courseId: resJson.courseId,
          }),
        });

        if (res2.status === 200) {
          console.log("Teach tablosuna başarıyla kayıt eklendi.");
          window.location.reload(false);
        } else {
          console.log("Teach tablosuna ekleme yaparken hata ile karşılaşıldı.");
        }
      } else {
        console.log("Course tablosuna ekleme yaparken hata ile karşılaşıldı.");
      }
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
            style={{ fontSize: "15px" }}
            onClick={() => {
              setFetchSemester("2022-2023");
            }}
          >
            2022-2023
          </Dropdown.Item>
          <Dropdown.Item
            style={{ fontSize: "15px" }}
            onClick={() => {
              setFetchSemester("2021-2022");
            }}
          >
            2021-2022
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {semesterCourses && <CourseCard courses={semesterCourses} />}
      <Button style={{ backgroundColor: "#507cff" }} onClick={handleShow}>
        Ders aç
      </Button>

      <Modal show={show} onHide={handleClose} size="xs">
        <Modal.Header closeButton>
          <Modal.Title>Ders aç</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="createCourse.courseName">
              <Form.Label className="form-label">Ders adı</Form.Label>
              <Form.Control
                type="text"
                rows={3}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="createCourse.courseDescription"
            >
              <Form.Label className="form-label">Dersin Açıklaması</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={100}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="createCourse.courseSemester"
            >
              <Form.Label className="form-label">Dersin Dönemi</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setCourseSemester(e.target.value);
                  console.log(courseSemester);
                }}
              >
                <option value="2022-2023">2022-2023</option>
                <option value="2021-2022">2021-2022</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button style={{ backgroundColor: "#507cff" }} onClick={saveHandle}>
            Dersi Oluştur
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert show={showAlert} variant="success" class="alert">
        <Alert.Heading class="alert-heading">Başarılı</Alert.Heading>
        <p>Ders başarıyla açıldı.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Kapat
          </Button>
        </div>
      </Alert>
    </Container>
  );
}

export default Courses;

import React, { useEffect, useState, useContext } from "react";
import { Container, Dropdown } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { InstructorContext } from "../context/AuthContext";

function InstructorCoursesCard() {
  const [courses, setCourses] = useState([]);
  const { instructor } = useContext(InstructorContext);
  const [semesterCourses, setSemesterCourses] = useState([]);
  const [fetchSemester, setFetchSemester] = useState("2022-2023");

  async function fetchCourses() {
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
      setCourses(resJson);
      setSemesterCourses(
        resJson.filter((course) =>
          course.courseSemester.includes(fetchSemester)
        )
      );
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setSemesterCourses(
      courses.filter((course) => course.courseSemester.includes(fetchSemester))
    );
  }, fetchSemester);

  return (
    <Container>
      <Card style={{ height: "20rem" }}>
        <Card.Header>Dönem Dersleri</Card.Header>
        <Card.Body>
          <Dropdown
            className="inline"
            align={{ lg: "start" }}
            style={{ marginBottom: "-3rem" }}
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
        </Card.Body>
        <Card.Body>
          <ListGroup style={{ maxHeight: "12rem", overflowY: "auto" }}>
            {semesterCourses &&
              semesterCourses.map((course) => (
                <>
                  <ListGroup.Item key={course.courseId}>
                    {course.courseName}
                  </ListGroup.Item>
                </>
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InstructorCoursesCard;

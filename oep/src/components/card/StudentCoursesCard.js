import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../context/AuthContext";

function StudentCoursesCard() {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(Context);
  const today = new Date();
  const currentYear = today.getFullYear();

  function filterCourses(courses) {
    return courses.filter((course) => {
      const [startYear, endYear] = course.courseSemester.split("-");
      return (
        currentYear >= parseInt(startYear) && currentYear <= parseInt(endYear)
      );
    });
  }

  async function fetchCourses() {
    let res = await fetch("http://localhost:8081/student/studentCourses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        studentId: user.studentId,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      setCourses(filterCourses(resJson));
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container>
      <Card style={{ height: "17rem" }}>
        <Card.Header>Dönem Dersleri</Card.Header>
        <Card.Body>
          <ListGroup style={{ maxHeight: "12rem", overflowY: "auto" }}>
            {courses &&
              courses.map((course) => (
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

export default StudentCoursesCard;

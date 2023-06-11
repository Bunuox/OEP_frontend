import React, { useState, useContext, useEffect } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { InstructorContext } from "../../../components/context/AuthContext";
import InstructorGradeExamsList from "./ExamsList";

function InstructorExamResults() {
  const { instructor } = useContext(InstructorContext);
  const [filterSemester, setFilterSemester] = useState("2023");
  const [exams, setExams] = useState([]);
  const [semesterExams, setSemesterExams] = useState([]);

  async function fetchExams() {
    let res = await fetch("http://localhost:8081/instructor/instructorExams", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        instructorId: instructor.instructorId,
      }),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      console.log(resJson);
      setExams(resJson);
      setSemesterExams(
        resJson.filter((exam) => exam.examDate.includes(filterSemester))
      );
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    setSemesterExams(
      exams.filter((exam) => exam.examDate.includes(filterSemester))
    );
  }, filterSemester);

  return (
    <Container>
      <Dropdown
        className="inline"
        align={{ lg: "start" }}
        style={{ marginBottom: "3rem" }}
      >
        <Dropdown.Toggle variant="" id="dropdown-basic">
          {filterSemester}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setFilterSemester("2023");
            }}
            style={{ fontSize: "15px" }}
          >
            2023
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setFilterSemester("2022");
            }}
            style={{ fontSize: "15px" }}
          >
            2022
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {setSemesterExams && <InstructorGradeExamsList exams={semesterExams} />}
    </Container>
  );
}

export default InstructorExamResults;

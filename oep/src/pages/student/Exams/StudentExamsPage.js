import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Context } from "../../../components/context/AuthContext";
import StudentExamList from "./ExamList";

function StudentExamsPage() {
  const [exams, setExams] = useState([]);
  const { user } = useContext(Context);

  async function fetchExams() {
    let res = await fetch("http://localhost:8081/student/findStudentExams", {
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
      setExams(resJson);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  return <Container>{exams && <StudentExamList exams={exams} />}</Container>;
}

export default StudentExamsPage;

import React, { useContext, useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { Context } from "../../components/context/AuthContext";

function StudentExamResults() {
  const { user } = useContext(Context);
  const [grades, setGrades] = useState([]);
  const [exams, setExams] = useState([]);
  const [mergedList, setMergedList] = useState([]);
  const [combinedList, setCombinedList] = useState([]);

  async function findStudentResults() {
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
      let fetchGrades = await fetch(
        "http://localhost:8081/examResult/findStudentResultByExamId",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            studentId: user.studentId,
            examsId: resJson.map((item) => item.examId),
          }),
        }
      );
      let fetchGradesJson = await fetchGrades.json(); // Await the response
      if (fetchGrades.status === 200) {
        setGrades(fetchGradesJson);
        console.log(fetchGradesJson);
      }
    }
  }

  useEffect(() => {
    findStudentResults();
  }, []);

  useEffect(() => {
    if (exams && grades) {
      const merged = exams.map((exam) => {
        const grade = grades.find(
          (grade) => grade && grade.examId === exam.examId
        );
        const examGrade =
          grade !== undefined && grade !== null
            ? grade.grade
            : "Notlandırılmadı";
        return {
          ...exam,
          examGrade,
        };
      });
      setMergedList(merged);
      console.log(merged);
    } else if (exams && !grades) {
      const merged = exams.map((exam) => ({
        ...exam,
        examGrade: "Notlandırılmadı",
      }));
      setMergedList(merged);
      console.log(merged);
    } else {
      setMergedList([]);
      console.log([]);
    }
  }, [exams, grades]);

  return (
    <Container>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Sınav Adı</th>
            <th>Sınav Tarihi</th>
            <th>Sınav Etkisi</th>
            <th>Sınav Sonucu</th>
          </tr>
        </thead>
        <tbody>
          {mergedList &&
            mergedList.map((results, index) => (
              <>
                <tr>
                  <td>{results.examName}</td>
                  <td>{results.examDate}</td>
                  <td>{results.affect}</td>
                  <td>{results.examGrade}</td>
                </tr>
              </>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentExamResults;

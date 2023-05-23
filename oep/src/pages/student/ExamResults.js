import React from "react";
import { Table } from "react-bootstrap";

function StudentExamResults() {
  const examData = [
    {
      examName: "Calculus-1 Vize",
      examDate: "2023-05-25",
      impactDescription: "2022-2023 dönemi Calculus-1 vize sınavı",
      affect: "40",
      grade: "80",
    },
    {
      examName: "Fizik-1 Vize",
      examDate: "2023-05-23",
      impactDescription: "2022-2023 dönemi Fizik-1 dersi vize sınavı",
      affect: "30",
      grade: "62",
    },
  ];

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Sınav Adı</th>
          <th>Sınav Tarihi</th>
          <th>Sınav Açıklaması</th>
          <th>Sınav Etkisi</th>
          <th>Sınav Sonucu</th>
        </tr>
      </thead>
      <tbody>
        {examData.map((exam, index) => (
          <tr key={index}>
            <td>{exam.examName}</td>
            <td>{exam.examDate}</td>
            <td>{exam.impactDescription}</td>
            <td>{exam.affect}</td>
            <td>{exam.grade}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StudentExamResults;

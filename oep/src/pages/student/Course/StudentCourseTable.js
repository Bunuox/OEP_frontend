import React from "react";
import { Table } from "react-bootstrap";

function StudentCourseTable({ foundCourse }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Ders ID</th>
          <th>Ders Adı</th>
          <th>Ders açıklaması</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> </td>
          <td>{foundCourse.courseId}</td>
          <td>{foundCourse.courseName}</td>
          <td>{foundCourse.description}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StudentCourseTable;

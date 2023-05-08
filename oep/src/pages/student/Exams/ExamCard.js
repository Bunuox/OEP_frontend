import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

function StudentExamCard({ exam }) {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function tick() {
    setDate(new Date());
  }

  function addMinutesToTime(timeString, minutesToAdd) {
    const [hours, minutes] = timeString.split(":");
    const dateObj = new Date();
    dateObj.setHours(parseInt(hours, 10));
    dateObj.setMinutes(parseInt(minutes, 10) + minutesToAdd);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function compareTime(firstTime, secondTime) {
    const [firstHour, firstMinute] = firstTime.split(":");
    const [secondHour, secondMinute] = secondTime.split(":");

    const firstDate = new Date();
    firstDate.setHours(firstHour, firstMinute, 0, 0);

    const secondDate = new Date();
    secondDate.setHours(secondHour, secondMinute, 0, 0);

    return secondDate.getTime() <= firstDate.getTime();
  }

  function isJoinAvaliable() {
    let duration = String(exam.examDuration);
    let examEndDate = addMinutesToTime(exam.examTime, duration);
    if (formatDate(date) === exam.examDate) {
      return !compareTime(
        `${date.getHours()}:${date.getMinutes()}`,
        examEndDate
      );
    } else {
      return false;
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <Container>
      <Card
        className="card"
        style={{ width: "20rem", height: "fit-content" }}
        bg={"Light"}
        text={"black"}
      >
        <Card.Header
          as="h5"
          className="d-flex flex-column align-items-center"
          style={{ backgroundColor: "#e9444a", color: "white" }}
        >
          <FaPencilAlt />
          <div className="card-header-id"> {exam.examName}</div>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Ders ID: ${exam.courseId}`}</Card.Subtitle>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Sınav tarihi: ${exam.examDate}`}</Card.Subtitle>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Sınav saati: ${exam.examTime}`}</Card.Subtitle>
          <Card.Subtitle
            tag="h6"
            className="mb-2"
          >{`Sınav süresi: ${exam.examDuration} dk.`}</Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-right">
          {isJoinAvaliable() ? (
            <>
              <Button
                variant="danger"
                className="d-flex flex-column justify-content-end"
                onClick={() => {
                  //let path = "/instructor/exams/" + exam.examId;
                  //navigate(path);
                }}
              >
                Giriş Yap
              </Button>
            </>
          ) : (
            undefined
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default StudentExamCard;

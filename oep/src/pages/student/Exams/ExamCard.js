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
    const [hour, minute, second] = timeString.split(":").map(Number);
    const totalSeconds = hour * 3600 + minute * 60 + second + minutesToAdd * 60;
    const newHour = Math.floor(totalSeconds / 3600) % 24;
    const newMinute = Math.floor((totalSeconds - newHour * 3600) / 60);
    const newSecond = totalSeconds % 60;
    const newTime = `${newHour
      .toString()
      .padStart(2, "0")}:${newMinute
      .toString()
      .padStart(2, "0")}:${newSecond.toString().padStart(2, "0")}`;
    return newTime;
  }

  function compareTime(currentTime, endTime) {
    const [currentHour, currentMinute] = currentTime.split(":");
    const [endHour, endMinute] = endTime.split(":");
    const [startHour, startMinute] = exam.examTime.split(":");

    const currentDate = new Date();
    currentDate.setHours(currentHour, currentMinute, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    return (
      startDate.getTime() <= currentDate.getTime() &&
      currentDate.getTime() <= endDate.getTime()
    );
  }

  function isJoinAvaliable() {
    let duration = String(exam.examDuration);
    let examEndDate = addMinutesToTime(exam.examTime, duration);
    if (formatDate(date) === exam.examDate) {
      return compareTime(
        `${date.getHours()}:${date.getMinutes()}:00`,
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
                  let path = "/student/exams/faceIdentification/" + exam.examId;
                  navigate(path);
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

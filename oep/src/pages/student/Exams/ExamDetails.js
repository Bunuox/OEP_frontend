import React, { useEffect, useContext, useRef, useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import StudentQuestionCard from "../../../components/question/StudentQuestionCard";
import { Context } from "../../../components/context/AuthContext";
import Webcam from "react-webcam";

function StudentExamDetails() {
  const { user } = useContext(Context);
  const params = useParams();
  const [savedQuestions, setSavedQuestions] = useState([]);

  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(true);
  let [images, setImages] = useState([]);

  const handleUserMediaError = (error) => {
    console.log("Webcam error:", error);
    alert("Kamera erişimi reddedildi. Lütfen kamera izni verin.");
    window.location.reload();
  };

  async function fetchQuestions() {
    let res = await fetch(
      "http://localhost:8081/question/findQuestionsByExamId",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          examId: params.id,
        }),
      }
    );
    let resJson = await res.json();
    if (res.status === 200) {
      setSavedQuestions(resJson);
    }
  }

  const saveScreenshot = async () => {
    console.log(images.length);
    while (images.length < 5) {
      let _imageSrc =
        webcamRef && webcamRef.current
          ? webcamRef.current.getScreenshot()
          : null;
      if (_imageSrc) {
        const _imageData = dataURItoBlob(_imageSrc);
        const _formData = new FormData();

        images.push(_imageData);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (images.length === 5) {
          images.forEach((img, index) => {
            _formData.append("images", img, user.studentId);
          });

          try {
            const response = await fetch(
              "http://localhost:8081/student/eyeTracking",
              {
                method: "POST",
                body: _formData,
              }
            );
            let resJson = await response.json();
            if (resJson.isCheating) {
              window.alert("Kopya çekiyorsunuz, lütfen sınavınıza odaklanın!");
            }
          } catch (error) {
            console.log("Upload error:", error);
          }
        } else {
          console.log("webcamRef is null");
          return;
        }
      }
    }
    images = [];
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveScreenshot();
    }, 1000); // 1000 -> 1 saniye.

    return () => {
      clearInterval(intervalId); // Bu, bileşenin temizlenmesi durumunda interval'ı durdurur.
    };
  }, []); // Bu boş dizi, bu useEffect'in sadece bir kez çalışmasını sağlar.

  return (
    <Container>
      <Row>
        {savedQuestions &&
          savedQuestions.map((question) => (
            <Form key={question.questionId}>
              <StudentQuestionCard
                key={question.questionId}
                question={question}
              />
            </Form>
          ))}
      </Row>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        onUserMediaError={handleUserMediaError}
        style={{ position: "fixed", top: "20px", right: "20px", width: "20px", height: "20px" }}
      />
    </Container>
  );
}

export default StudentExamDetails;

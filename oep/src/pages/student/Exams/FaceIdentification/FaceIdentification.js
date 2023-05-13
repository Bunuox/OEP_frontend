import React, { useContext, useRef, useState } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../../../../components/context/AuthContext";
import Webcam from "react-webcam";

function StudentFaceIdentificationPage() {
  const { user } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [isFaceIdentified, setIsFaceIdentified] = useState(false);
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(true);

  const handleUserMediaError = (error) => {
    console.log("Webcam error:", error);
    alert("Kamera erişimi reddedildi. Lütfen kamera izni verin.");
    window.location.reload();
  };

  const saveScreenshot = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageData = dataURItoBlob(imageSrc);

    const formData = new FormData();
    formData.append("image", imageData, "screenshot.jpeg"); //burada id'yi yollamam lazim. sonuncu parametre olarak.

    try {
      console.log("end-point öncesi");
      //const response = await axios.post("http://localhost:3001/api/upload", formData); //express.js yerine java'ya yolla.
      const response = await fetch(
        "http://localhost:8081/student/faceIdentification",
        {
          method: "POST",
          headers: {
            studentId: user.studentId,
          },
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Image successfully sent to Java server");
      } else {
        console.log("Error sending image to Java server:", response.statusText);
      }
    } catch (error) {
      setIsFaceIdentified(true);
      console.log("catche dustun essek.");
      console.error("Upload error:", error);
    }
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

  const webcamStyle = {
    display: showWebcam ? "block" : "none",
  };

  return (
    <>
      <Container>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={webcamStyle}
          onUserMediaError={handleUserMediaError}
        />
        <Col>
          {showWebcam && (
            <>
              <Col>
                <p style={{ color: "red" }}>Lütfen kameraya yaklaşın</p>
              </Col>
              <Col>
                <Button variant="secondary" onClick={saveScreenshot}>
                  Görüntüyü Kaydet
                </Button>
              </Col>
            </>
          )}
        </Col>
        <Col>
          {isFaceIdentified && (
            <Button
              variant="danger"
              onClick={() => {
                let path = "/student/exams/" + params.id;
                navigate(path);
              }}
            >
              Sınava giriş yap
            </Button>
          )}
        </Col>
      </Container>
    </>
  );
}

export default StudentFaceIdentificationPage;

import React, { useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Webcam from "react-webcam";
import axios from "axios";

function Student() {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleExamStart = () => {
    setShowWebcam(true);
  };

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
      console.log('end-point öncesi')
      //const response = await axios.post("http://localhost:3001/api/upload", formData); //express.js yerine java'ya yolla.
      const response = await fetch("http://localhost:8081/student/faceIdentification", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Image successfully sent to Java server");
      } else {
        console.log("Error sending image to Java server:", response.statusText);
      }
    } catch (error) {
      console.log('catche dustun essek.')
      console.error("Upload error:", error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
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
    <Container>
      <ul>
        <li>Aldığın dersler</li>
        <li>Notlarım</li>
        <li>...</li>
      </ul>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={webcamStyle}
        onUserMediaError={handleUserMediaError}
      />
      <Button variant="primary" onClick={handleExamStart}>
        Sınava Gir
      </Button>
      {showWebcam && (
        <Button variant="secondary" onClick={saveScreenshot}>
          Görüntüyü Kaydet
        </Button>
      )}
    </Container>
  );
}

export default Student;

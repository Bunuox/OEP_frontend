import React, { useContext, useRef, useState } from "react";
import { Container, Button, Col } from "react-bootstrap";
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
  const [images, setImages] = useState([]);
  const newImages = [...images];
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isLoadingMessageAvaliable, setIsLoadingMessageAvailable] = useState(
    ""
  );

  const handleUserMediaError = (error) => {
    console.log("Webcam error:", error);
    alert("Kamera erişimi reddedildi. Lütfen kamera izni verin.");
    window.location.reload();
  };

  const saveScreenshot = async () => {
    if (newImages.length > 0) {
      return;
    }

    while (newImages.length < 10) {
      setIsLoadingMessageAvailable(true);
      console.log(newImages.length);
      const _imageSrc = webcamRef.current.getScreenshot();
      const _imageData = dataURItoBlob(_imageSrc);

      newImages.push(_imageData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (newImages.length === 10) {
        const _formData = new FormData();
        newImages.forEach((img, index) => {
          _formData.append("images", img, user.studentId);
        });
        setIsButtonActive(false);
        try {
          const response = await fetch(
            "http://localhost:8081/student/faceIdentification",
            {
              method: "POST",
              body: _formData,
            }
          );
          let resJson = await response.json();
          console.log(resJson);
          if (resJson.isThisTruePerson) {
            console.log('kullanici dogrulandi.');
            setIsFaceIdentified(true);
          } else {
            setIsLoadingMessageAvailable(false);
            console.log("reload atilmasi lazim");
            window.location.reload();
          }
        } catch (error) {
          console.log("Upload error:", error);
        }
      }
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
                {isLoadingMessageAvaliable ? (
                  <>
                    <p>Lütfen bekleyin...</p>
                  </>
                ) : (
                  undefined
                )}
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

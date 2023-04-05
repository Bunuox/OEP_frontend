import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import LoginForm from "../../components/form/LoginForm";
import OepBrand from "../../components/Brand/OepBrand";
import { BsLock } from "react-icons/bs";
import { useStudentAuth } from "../../components/context/AuthStudentContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useStudentAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = async (e) => {
    e.preventDefault();
    console.log(email)
    try {
      let res = await fetch("http://localhost:8081/student/findStudent", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setUser({
          studentId: resJson.studentId,
        });
        navigate("/student");
      } else {
        console.log("başarısız");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <body>
      <OepBrand />
      <LoginForm>
        <h3>Giriş yap</h3>
        <Input
          id="user_mail"
          type={"text"}
          placeholder={"Email"}
          onChange={(e) => {
            setEmail("text");
          }}
        />
        <Input
          id="user_password"
          type={"password"}
          placeholder={"Şifre"}
          onChange={(e) => {
            setPassword("text");
          }}
        />
        <Button
          type="submit"
          onClick={loginHandle}
          className={"button-secondary"}
        >
          Giriş
        </Button>
        <a href="/register">Kayıt ol</a>
        <br></br>
        <p>
          Şifremi Unuttum
          <BsLock />
        </p>
      </LoginForm>
    </body>
  );
}

export default LoginPage;

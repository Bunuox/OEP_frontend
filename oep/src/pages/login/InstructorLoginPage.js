import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import LoginForm from "../../components/form/LoginForm";
import OepBrand from "../../components/Brand/OepBrand";
import { BsLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { InstructorContext } from "../../components/context/AuthStudentContext";

function InstructorLoginPage() {
  const navigate = useNavigate();
  const { instructor, setInstructor } = useContext(InstructorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8081/instructor/findInstructor", {
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
        setInstructor({
          instructorId: resJson.instructorId
        })
        navigate("/instructor");
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
      <LoginForm className="instructor">
        <h3>Giriş yap</h3>
        <Input
          id="user_mail"
          type={"text"}
          placeholder={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          id="user_password"
          type={"password"}
          placeholder={"Şifre"}
          onChange={(e) => {
            setPassword(e.target.value);
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

export default InstructorLoginPage;

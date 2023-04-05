import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import LoginForm from "../../components/form/LoginForm";
import OepBrand from "../../components/Brand/OepBrand";
import { BsLock } from "react-icons/bs";

function TeacherLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <body>
      <OepBrand />
      <LoginForm className="teacher">
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
          onClick={() => console.log("login")}
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

export default TeacherLoginPage;

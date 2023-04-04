import React from "react";
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

  const loginHandle = () => {
    console.log("txt");
    setUser({
      id: 1,
      username: "bunyaminkilicer",
    });
    navigate("/student");
  };

  return (
    <body>
      <OepBrand />
      <LoginForm>
        <h3>Giriş yap</h3>
        <Input id="user_mail" type={"text"} placeholder={"Email"} />
        <Input id="user_password" type={"password"} placeholder={"Şifre"} />
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

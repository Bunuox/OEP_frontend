import React from "react";
import "./form.css";

function LoginForm({ children, className }) {
  return <div className={"form " + className}>{children}</div>;
}

export default LoginForm;

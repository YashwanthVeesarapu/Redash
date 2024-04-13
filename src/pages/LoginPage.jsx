import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Button, Input } from "@mui/material";
import "./styles.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ setOpen }) => {
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser)
      navigate("/profile", {
        state: { severity: "info", message: "User logged in" },
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    email = email.value;
    password = password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", {
        state: {
          severity: "success",
          message: "Login succes!",
        },
      });
    } catch (error) {
      setOpen({ severity: "error", message: "Login failure!" });
    }
  };

  return (
    <MainLayout setOpen={setOpen} page={"login"}>
      <form className="loginForm" onSubmit={handleLogin}>
        <h2>Login</h2>

        <Input required name="email" placeholder="Email" type="email" />
        <Input
          required
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button type={"submit"} variant={"contained"}>
          Login
        </Button>
      </form>
      <Link to={"/register"}>Not registered yet!</Link>
    </MainLayout>
  );
};

export default LoginPage;

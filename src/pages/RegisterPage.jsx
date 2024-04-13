import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Alert, Button, Input, Snackbar } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = ({ setOpen }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser)
      navigate("/profile", {
        state: { severity: "info", message: "User logged in" },
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password, cpassword } = e.target;
    name = name.value;
    email = email.value;
    password = password.value;
    cpassword = cpassword.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      setOpen({ severity: "success", message: "Sign up succes!" });
      auth.signOut();

      navigate("/login", {
        state: {
          severity: "info",
          message: "You can now login with your credentials",
        },
      });
    } catch (error) {
      setOpen({ severity: "error", message: "Registration failure!" });
    }
  };
  return (
    <MainLayout>
      <h2>Register</h2>
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <Input
          name="name"
          placeholder="Full Name"
          required
          autoComplete="name"
        />
        <Input name="email" placeholder="Email" required autoComplete="email" />
        <Input
          name="password"
          placeholder="Password"
          required
          type={"password"}
        />
        <Input
          name="cpassword"
          placeholder="Confirm Password"
          required
          type={"password"}
        />

        <Button type="submit" variant={"contained"}>
          Create Account
        </Button>
      </form>
      <Link to={"/login"}>Already with us?</Link>
    </MainLayout>
  );
};

export default RegisterPage;

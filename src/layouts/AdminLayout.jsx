import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

const AdminLayout = (props) => {
  const auth = getAuth();

  if (auth.currentUser == null) return <Navigate to="/" />;

  if (auth?.currentUser?.email == "hello@redash.us")
    return (
      <>
        <Header />
        <main>{props.children}</main>
      </>
    );
  else return <Navigate to="/" />;
};

export default AdminLayout;

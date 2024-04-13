import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAuth } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { apiInstance } from "../utils/apiInstance";
import { useEffect } from "react";

const ProfilePage = ({ setOpen }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("account");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName);
      setEmail(auth.currentUser.email);
      setUid(auth.currentUser.uid);

      apiInstance
        .get(`/orders/${auth.currentUser.email}`)
        .then((res) => setData(res.data));
    } else
      navigate("/login", {
        state: { severity: "error", message: "Login Required" },
      });
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() =>
      navigate("/login", {
        state: { severity: "success", message: "Sucessfully logged out." },
      })
    );
  };

  return (
    <MainLayout page={"profile"} setOpen={setOpen}>
      <div className="profile">
        <div className="profile-nav">
          <div
            className={step == "account" ? "nav-item-active" : "nav-item"}
            onClick={() => setStep("account")}
          >
            Account
          </div>
          <div
            className={step == "orders" ? "nav-item-active" : "nav-item"}
            onClick={() => setStep("orders")}
          >
            Orders
          </div>
          <div
            className={step == "address" ? "nav-item-active" : "nav-item"}
            onClick={() => setStep("address")}
          >
            Shipping Address
          </div>
          <div
            className={step == "payment" ? "nav-item-active" : "nav-item"}
            onClick={() => setStep("payment")}
          >
            Payments
          </div>
        </div>

        {step == "account" && (
          <div className="profile-details">
            <h2>Account</h2>
            <TextField value={name} label={"Name"} placeholder="Full Name" />
            <TextField value={email} placeholder="Email" label="Email" />
            <div>
              <h3>Rewards Member</h3>
              <p
                style={{
                  fontFamily: "bcode",
                  fontSize: "80px",
                  padding: 0,
                  margin: 0,
                }}
              >
                {uid}
              </p>
            </div>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
        )}
        {step == "orders" && (
          <div className="order-details">
            <h2>Orders History</h2>
            <div className="orders-container">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((o, i) => (
                  <div className="order" key={i}>
                    <h3 style={{ padding: 0, margin: 0 }}>#{o._id}</h3>
                    {/* <br />
                    Date: {Date(o.createdDate)} */}
                    {o.orderItems.map((element, i) => (
                      <div className="order-item" key={i}>
                        <h3>{element.name}</h3>
                        <img src={element.img} />
                      </div>
                    ))}
                    <h3>${o.total}</h3>
                    <p>Tracking: {o.tracking}</p>
                    <p>Status: {o.status}</p>
                  </div>
                ))
              ) : (
                <>Oh no! No orders yet!!!</>
              )}
            </div>
          </div>
        )}

        {step == "address" && (
          <div className="address-details">
            <h2>My Addresses</h2>
            <Button onClick={() => alert("Currently we disabled this feature")}>
              Add New Address
            </Button>
          </div>
        )}

        {step == "payment" && (
          <div className="address-details">
            <h2>My Payment methods</h2>
            <Button onClick={() => alert("Currently we disabled this feature")}>
              Add New Card
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;

import * as React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import CheckoutForm from "../components/Forms/CheckoutForm";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import "./styles.scss";
import AddressForm2 from "../components/Forms/AddressForm2";
import { CircularProgress } from "@mui/material";
import ContactForm from "../components/Forms/ContactForm";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateCheckoutDetails } from "../redux/actions";
import { apiInstance } from "../services";

// const products = [
//   {
//     name: "Product 1",
//     desc: "A nice thing",
//     price: "$9.99",
//   },
//   {
//     name: "Product 2",
//     desc: "Another thing",
//     price: "$3.45",
//   },
//   {
//     name: "Product 3",
//     desc: "Something else",
//     price: "$6.51",
//   },
//   {
//     name: "Product 4",
//     desc: "Best thing of all",
//     price: "$14.11",
//   },
//   { name: "Shipping", desc: "", price: "Free" },
// ];

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Contact Info", "Shipping address", "Payment details"];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];

export default function CheckoutPage() {
  const { products, total } = useSelector((state) => state.cart);
  const checkout = useSelector((state) => state.checkout);

  let s = parseInt(new URLSearchParams(window.location.search).get("s"));

  const [activeStep, setActiveStep] = useState(s ? s : 0);

  const [stripePromise, setStripePromise] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [message, setMessage] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const auth = getAuth();

  const [shp, setShp] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (s == 2 && message == "Payment succeeded!") {
    navigate("/checkout/success", {
      state: {
        severity: "success",
        message: message,
        paymentInfo: paymentInfo,
      },
    });
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    apiInstance.get("/config/pk").then(async (res) => {
      const { pk } = res.data;
      setStripePromise(await loadStripe(pk));
    });
  }, []);

  useEffect(() => {
    apiInstance
      .post("/config/payment", {
        amount: total,
      })
      .then((res) => {
        const { clientSecret } = res.data;

        setClientSecret(clientSecret);
      });
  }, []);
  useEffect(() => {
    if (auth.currentUser) {
      setContactInfo({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        phone: auth.currentUser.phoneNumber,
      });
    }
  }, [auth.currentUser]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ContactForm
            setContactInfo={setContactInfo}
            contactInfo={contactInfo}
          />
        );
      case 1:
        return (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <AddressForm2
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
            />
          </Elements>

          // <AddressForm
          //   shippingAddress={shippingAddress}
          //   setShippingAddress={setShippingAddress}
          // />
        );
      case 2:
        return (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <CheckoutForm
              message={message}
              setMessage={setMessage}
              setPaymentInfo={setPaymentInfo}
            />
          </Elements>
        );
      // case 2:
      //   return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  useEffect(() => {
    try {
      checkString(shippingAddress?.name);
      checkString(shippingAddress?.address?.line1);
      checkString(shippingAddress?.address?.city);
      checkString(shippingAddress?.address?.state);
      checkString(shippingAddress?.address?.postal_code);

      setShp(true);
    } catch (error) {}
  }, [shippingAddress]);

  function checkString(str) {
    if (!str) throw "Err";
    str = str.trim();
    if (str.length < 2) throw "Err";
  }

  if (!clientSecret || !stripePromise)
    return (
      <MainLayout>
        <CircularProgress style={{ color: "white" }} />
      </MainLayout>
    );

  return (
    <MainLayout>
      <div className="checkout">
        <div className="checkout-summary">
          <Container maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <h2 align="center">Order summary</h2>
              <List disablePadding>
                {checkout.orderItems.map((product, i) => (
                  <ListItem key={i} sx={{ py: 1, px: 0 }}>
                    <ListItemText
                      primary={product.name}
                      secondary={`${product.size.toUpperCase()} | Quantity: ${
                        product.quantity
                      }`}
                    />
                    <Typography variant="body2">{product.price}</Typography>
                  </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Total" />
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 20, fontWeight: 700 }}
                  >
                    ${total}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </Container>
        </div>

        {checkout.shipping != undefined && activeStep == 2 && (
          <div className="checkout-shipping">
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <h3>Shipping</h3>
                <Typography gutterBottom>{checkout.shipping.name}</Typography>
                <Typography gutterBottom>
                  {checkout.shipping.address.line1}
                  {", "}
                  {checkout.shipping.address.line2 && checkout.shipping.line2}
                  <br />
                  {checkout.shipping.address.city}
                  {", "}
                  {checkout.shipping.address.state}
                  {", "}
                  {checkout.shipping.address.postal_code}
                </Typography>

                <sub>Free</sub>
              </Paper>
            </Container>
          </div>
        )}

        <div className="checkout-details">
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <h2 align="center">Checkout</h2>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    {activeStep === 0 && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            updateCheckoutDetails({
                              contact: contactInfo,
                            })
                          );
                          handleNext();
                        }}
                        sx={{ mt: 3, ml: 1 }}
                        disabled={!contactInfo}
                      >
                        Next
                      </Button>
                    )}

                    {activeStep === 1 && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            updateCheckoutDetails({
                              shipping: shippingAddress,
                            })
                          );
                          handleNext();
                        }}
                        sx={{ mt: 3, ml: 1 }}
                        disabled={!shp}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </Paper>
          </Container>
        </div>
      </div>
    </MainLayout>
  );
}

// import React, { useState } from "react";
// import { useEffect } from "react";
// import { apiInstance } from "../utils/apiInstance";
// import { loadStripe } from "@stripe/stripe-js";
// import { useSelector } from "react-redux";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../components/Forms/CheckoutForm";
// import MainLayout from "../layouts/MainLayout";
// import { CircularProgress } from "@mui/material";

// import "./styles.scss";
// import AddressForm from "../components/Forms/AddressForm";

// const CheckoutPage = () => {
//   const { cart } = useSelector((state) => state);
//   const [stripePromise, setStripePromise] = useState(null);
//   const [clientSecret, setClientSecret] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     apiInstance.get("/config/pk").then(async (res) => {
//       const { pk } = res.data;
//       setStripePromise(await loadStripe(pk));
//     });
//   }, []);

//   useEffect(() => {
//     apiInstance
//       .post("/config/payment", {
//         amount: cart.total,
//       })
//       .then((res) => {
//         const { clientSecret } = res.data;

//         setClientSecret(clientSecret);
//         setLoading(false);
//       });
//   }, []);

//   console.log(cart.products);

//   if (loading)
//     return (
//       <MainLayout>
//         <CircularProgress />
//       </MainLayout>
//     );
//   else
//     return (
//       <MainLayout>
//         <h2>Checkout</h2>
//         <div className="checkout-layout">
//           <div className="checkout-left">
//             <div className="checkout-summary">
//               <h3>Order Summary</h3>

//               {Array.isArray(cart.products) &&
//                 cart.products.map((p, i) => (
//                   <div className="checkoutItem">
//                     <h4>{p.name}</h4>
//                     <h5>{p.price}</h5>
//                     <h5>{p.quantity}</h5>
//                     <h6>{p.price * p.quantity}</h6>
//                   </div>
//                 ))}

//               <h3>Total: {cart.total}</h3>
//             </div>
//             <div className="checkout-address">
//               <AddressForm />
//             </div>
//           </div>

//           <div className="checkout-right">
//             <Elements
//               stripe={stripePromise}
//               options={{ clientSecret: clientSecret }}
//             >
//               <CheckoutForm />
//             </Elements>
//           </div>
//         </div>
//       </MainLayout>
//     );
// };

// export default CheckoutPage;

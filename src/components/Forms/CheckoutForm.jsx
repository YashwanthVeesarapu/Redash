import { Button, CircularProgress } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useState } from "react";
import { returnURL } from "../../utils/apiInstance";
import { useSelector } from "react-redux";

import "./styles.scss";

const CheckoutForm = ({ message, setMessage, setPaymentInfo }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const { checkout } = useSelector((state) => state);

  console.log(checkout);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          setPaymentInfo(paymentIntent);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setPaymentInfo(paymentIntent);

          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setPaymentInfo(paymentIntent);

          break;
        default:
          setMessage("Something went wrong.");
          setPaymentInfo(paymentIntent);
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: returnURL,
        receipt_email: "hello@redash.us",
        shipping: checkout.shipping,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        style={{ margin: "10px" }}
        variant={"contained"}
        disabled={isLoading || !stripe || !elements}
        type={"submit"}
      >
        <span id="button-text">
          {isLoading ? (
            <CircularProgress style={{ fontSize: "20px" }} />
          ) : (
            "Place Order"
          )}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;

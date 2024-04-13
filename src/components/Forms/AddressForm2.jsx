import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm2 = ({ setShippingAddress }) => {
  return (
    <form>
      <h3>Shipping</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(e) => {
          if (e.complete) {
            setShippingAddress({
              name: e.value.name,
              address: e.value.address,
            });
          }
        }}
      />
    </form>
  );
};

export default AddressForm2;

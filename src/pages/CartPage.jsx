import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckoutDetails } from "../redux/actions";

import "./styles.scss";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { products, total } = useSelector((allState) => allState.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <MainLayout page={"cart"}>
      <div className="cart-layout">
        <h2>Cart</h2>
        {Array.isArray(products) && products.length > 0 ? (
          <>
            {products.map((p, i) => (
              <CartItem p={p} key={i} />
            ))}

            <h4> Subtotal ${total} </h4>
            <Button
              variant={"contained"}
              onClick={() => {
                dispatch(
                  updateCheckoutDetails({
                    orderItems: products,
                    total: total,
                  })
                );
                navigate("/checkout");
              }}
            >
              Review + Checkout
            </Button>
            <p>Shipping & Taxes Calculated at Checkout</p>
          </>
        ) : (
          <>
            <p>Your cart looks so empty!!!</p>
            <Button onClick={() => navigate("/shop")} variant={"contained"}>
              Shop now
            </Button>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;

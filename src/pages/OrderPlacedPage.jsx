import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
} from "@mui/material";
import { clearCart, clearCheckout } from "../redux/actions";
import { apiInstance } from "../services";

const OrderPlacedPage = ({ setOpen }) => {
  const { state } = useLocation();
  const checkout = useSelector((state) => state.checkout);

  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.paymentInfo) return;
    if (checkout.orderItems.length == 0) {
      setLoading(false);
      navigate("/profile");
      return;
    }

    apiInstance
      .post("/orders/create", {
        ...checkout,
        paymentId: state?.paymentInfo?.id,
        total: state?.paymentInfo?.amount / 100,
        email: auth?.currentUser?.email,
        tracking: "To be Assigned",
        status: "Awaiting Confirmation",
        trackingLink: "",
      })
      .then((res) => {
        dispatch(clearCart());
        dispatch(clearCheckout());
        setOrderDetails(res.data);
        setLoading(false);
      });

    //Upload Order data
  }, []);

  if (loading)
    return (
      <MainLayout setOpen={setOpen}>
        <CircularProgress style={{ color: "white" }} />
      </MainLayout>
    );

  return (
    <MainLayout setOpen={setOpen}>
      <h1>Order Confirmation</h1>
      <h2>Order #{orderDetails._id}</h2>
      <TableContainer className="order-details" component={Paper}>
        <Table
          sx={{ minWidth: 500, maxWidth: "90%" }}
          aria-label="customized table"
        >
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Order Date
              </TableCell>
              <TableCell align="right">
                {new Date(orderDetails.createdDate).toString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Status
              </TableCell>
              <TableCell align="right">{orderDetails.status}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Tracking#
              </TableCell>
              <TableCell align="right">{orderDetails.tracking}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell align="right">${orderDetails.total}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                Shipping
              </TableCell>
              <TableCell align="right">
                <p>
                  {(orderDetails.shipping.address?.line1
                    ? orderDetails.shipping.address.line1
                    : "") +
                    ", " +
                    (orderDetails.shipping.address?.line2
                      ? orderDetails.shipping.address.line2
                      : "")}
                  <br />
                  {(orderDetails.shipping.address?.city
                    ? orderDetails?.shipping?.address?.city
                    : "") +
                    ", " +
                    (orderDetails.shipping.address?.state
                      ? orderDetails.shipping.address?.state
                      : "") +
                    ", " +
                    (orderDetails.shipping.address?.postal_code
                      ? orderDetails.shipping.address?.postal_code
                      : "")}
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default OrderPlacedPage;

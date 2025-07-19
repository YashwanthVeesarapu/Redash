import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const DealsLayout = ({
  children,
  page,
  setOpen,
}: {
  children: React.ReactNode;
  page?: string;
  setOpen?: (open: { severity: string; message: string }) => void;
}) => {
  const { state } = useLocation();
  const location = useLocation();

  useEffect(() => {
    if (state?.message) {
      setOpen && setOpen({ severity: state.severity, message: state.message });
      location.state = null;
    }
  }, [state]);

  return (
    <>
      <Header page={page || "deals"} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DealsLayout;

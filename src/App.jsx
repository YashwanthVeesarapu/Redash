import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import CustomisePage from "./pages/CustomPage/CustomisePage";
import ShopPage from "./pages/ShopPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import OrderPlacedPage from "./pages/OrderPlacedPage";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import ReturnsPage from "./pages/ReturnsPage";

import { app } from "./firebase/firebase";
import MusicPage from "./pages/MusicPage";
import DealsPage from "./pages/DealsPage";

function App() {
  const [open, setOpen] = useState({});
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    setLoading(false);
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({});
  };

  if (loading)
    return (
      <MainLayout page={"loading"} setOpen={setOpen}>
        <CircularProgress style={{ color: "white" }} />
      </MainLayout>
    );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setOpen={setOpen} />} />
        <Route path="/register" element={<RegisterPage setOpen={setOpen} />} />
        <Route path="/contact" element={<ContactPage setOpen={setOpen} />} />
        <Route path="/privacy" element={<PrivacyPage setOpen={setOpen} />} />
        <Route path="/returns" element={<ReturnsPage setOpen={setOpen} />} />

        <Route path="/custom" element={<CustomisePage />} />

        <Route path="/shop" element={<ShopPage setOpen={setOpen} />} />
        <Route path="/profile" element={<ProfilePage setOpen={setOpen} />} />
        <Route path="/hellobello" element={<AdminPage />} />
        <Route path="/product/:productName/:color" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout/success"
          element={<OrderPlacedPage setOpen={setOpen} />}
        />

        <Route path="/music" element={<MusicPage />} />
        <Route path="/deals" element={<DealsPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Snackbar
        open={open.severity ? true : false}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={open.severity}
          sx={{ width: "100%" }}
        >
          {open.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

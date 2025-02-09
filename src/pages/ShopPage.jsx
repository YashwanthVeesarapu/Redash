import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Product from "../components/Product";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../services/productsService";
import { apiInstance } from "../services";

const ShopPage = ({ setOpen }) => {
  const [products, setProducts] = useState([]);

  const [pagenum, setPagnum] = useState(1);

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const param = queryParams.get("query");

  useEffect(() => {
    setLoading(true);
    if (param == null) {
      // apiInstance
      //   .get(`/products/${pagenum}`)
      //   .then((res) => {
      //     setProducts(res.data.results);
      //     setLoading(false);
      //   })
      //   .catch(() => setLoading(false));

      getAllProducts(pagenum).then((res) => {
        setProducts(res);
        setLoading(false);
      });
    } else {
      apiInstance.post(`/products/search`, { query: param }).then((res) => {
        setProducts(res.data.results);
        setLoading(false);
      });
    }
  }, [param]);

  if (loading)
    return (
      <MainLayout setOpen={setOpen}>
        <CircularProgress style={{ color: "white" }} />
      </MainLayout>
    );

  return (
    <MainLayout setOpen={setOpen} page={"shop"}>
      <div className="shop-layout">
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((p, i) => <Product {...p} key={i} />)
        ) : (
          <>
            <p>Something went wrong, Sorry for the inconvinence.</p>
            <p>This issue has been reported</p>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ShopPage;

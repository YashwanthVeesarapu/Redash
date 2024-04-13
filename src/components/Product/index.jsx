import React, { useState, useEffect } from "react";
import { Skeleton, Typography } from "@mui/material";

import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Product = (product) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [timeout, setTimer] = useState(false);
  let { _id, images, name, price, discount } = product;

  const navigate = useNavigate();

  const src = Object.values(images)[0];
  discount = 0;

  useEffect(() => {
    const loadImage = (productThumbnail) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = productThumbnail;

        loadImg.onload = () =>
          setTimeout(() => {
            resolve(productThumbnail);
          });

        loadImg.onerror = (err) => reject(err);
      });
    };
    loadImage(src)
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("err", err));
  }, []);

  //   const history = useHistory();

  //   if (
  //     !documentID ||
  //     !productThumbnail ||
  //     !productName ||
  //     !productSize ||
  //     typeof productPrice === "undefined"
  //   )
  //     return null;

  // const handleAddToCart = (product) => {
  //   if (!product) return;
  //   dispatch(
  //     addProduct(product)
  //   );
  //   history.push('/cart');
  // };

  function redirect() {
    sessionStorage.setItem("scrool", window.scrollY);
    navigate(`/product/${_id}`);
  }

  setTimeout(() => {
    setTimer(true);
  }, 100);

  return (
    <div className={timeout ? "product-next" : "product"} onClick={redirect}>
      <div className="thumb">
        {src && imgsLoaded ? (
          <img src={src} alt={name} onLoad={() => setImgsLoaded(true)} />
        ) : (
          // <Skeleton variant="rect" width="100%" height={250} />
          <Skeleton className="thumb" variant="rect" height="250px" />
        )}
      </div>

      <div className="details">
        <ul>
          <li>
            {imgsLoaded ? (
              <span className="name">{name ? name : "N/A"}</span>
            ) : (
              <Skeleton
                style={{ marginLeft: "25%", marginRight: "25%" }}
                height="30px"
                variant="text"
              />
            )}
          </li>
          {imgsLoaded ? (
            <li>
              {discount === 0 ? (
                <span className="price">${price ? price : "N/A"}</span>
              ) : (
                <span className="price">
                  ${discount ? discount : "N/A"}&nbsp;
                  <s>${price ? price : "N/A"} </s>
                </span>
              )}
            </li>
          ) : (
            <Skeleton
              style={{ marginLeft: "30%", marginRight: "30%" }}
              height="20px"
              variant="text"
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Product;

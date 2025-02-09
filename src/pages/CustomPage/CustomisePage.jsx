import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import background_tshirt_front from "../../assets/front.png";
import background_tshirt_back from "../../assets/back.png";

import { fabric } from "fabric"; // v5

import axios from "axios";

import "./customise.scss";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import html2canvas from "html2canvas";
import { microURL } from "../../services";

const globalObject = {
  white: "#fff",
  black: "#101010",
  red: "#D0071E",
  green: "#5C9346",
  yellow: "#ffd667",
  navy: "#212642",
  maroon: "#721d37",
};

// print Options
const options = [
  "left-chest",
  "right-chest",
  "front",
  "back",
  "left-sleeve",
  "right-sleeve",
];

const BASE_PRICE = 14.99;

const designSizes = {
  front: {
    normal: { x: 8.5, y: 11, price: 25, name: "Normal" },
    normalLandscape: { x: 11, y: 8.5, price: 25, name: "Normal Landscape" },
    large: { x: 11, y: 17, price: 35, name: "Large" },
  },
  back: {
    normal: { x: 8.5, y: 11, price: 25, name: "Normal" },
    large: { x: 11, y: 17, price: 35, name: "Large" },
    normalLandscape: { x: 11, y: 8.5, price: 25, name: "Normal Landscape" },
    "out-label": { x: 4, y: 4, price: 15, name: "Out Label" },
  },
  "left-chest": {
    normal: { x: 4, y: 4, price: 15, name: "Normal" },
  },
  "right-chest": {
    normal: { x: 4, y: 4, price: 15, name: "Normal" },
  },
};

const CustomisePage = () => {
  const canvasEl = useRef(null);

  const [image, setImage] = useState("");

  const [dsize, setDSize] = useState("large");
  const [size, setSize] = useState("S");
  const [side, setSide] = useState("front");
  const [dimen, setDimen] = useState("");
  const [isbgRemoved, setIsBgRemoved] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [clr, setClr] = useState("white");

  const [product, setProduct] = useState({});

  const [resultUrl, setResultUrl] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  useEffect(() => {
    let canvas = new fabric.Canvas(canvasEl.current);
    let imageElement = document.getElementById("tshirt-backgroundpicture");

    if (side == "front") {
      imageElement.src = background_tshirt_front;
    } else if (side == "back") {
      imageElement.src = background_tshirt_back;
    }

    // if (!image) {
    //   canvas.clear();
    // }
    //  Create a new image that can be used in Fabric with the URL
    canvas.setHeight(dimen.y * (9.6 * 2));
    canvas.setWidth(dimen.x * (9.6 * 2));
    if (image) {
      let imageUrl = isbgRemoved
        ? image
        : typeof image == "string"
        ? image
        : URL.createObjectURL(image);

      toDataURL(imageUrl, function (dataUrl) {
        setResultUrl(dataUrl);
      });

      fabric.Image.fromURL(imageUrl, function (img) {
        // Define the image as background image of the Canvas
        img.scaleToWidth(150);

        canvas.add(img);
      });
    }

    return () => {
      // updateCanvasContext(null);
      canvas.dispose();
    };
  }, [image, dimen, side]);

  useEffect(() => {
    if (dsize == "") return;

    setDimen(designSizes[side][dsize]);
  }, [dsize]);

  const cart = async () => {
    if (!product || Object.keys(product).length == 0) {
      alert("Please add your design to continue.");
      return;
    }
    // let canvasImg = canvasEl.current.toDataURL("image/png");
    // let img = await html2canvas(document.querySelector("#placer")).then(
    //   (canvas) => {
    //     let data = canvas.toDataURL("image/jpg");
    //     return data;
    //   }
    // );

    // // convert original image to base64
    // let b64OriginalImage = await new Promise((resolve, reject) => {
    //   let reader = new FileReader();
    //   reader.onload = () => resolve(reader.result);
    //   reader.onerror = reject;
    //   reader.readAsDataURL(originalImage);
    // });

    // const cartItem = {
    //   _id: "RA0001",
    //   name: "Custom",
    //   quantity: "1",
    //   color: clr,
    //   price: BASE_PRICE + dimen.price,
    //   size: size,
    //   brand: "REDASH",
    //   img: img,
    //   originalImage: b64OriginalImage,
    //   designSize: dsize,
    // };
    // if (isbgRemoved) {
    //   cartItem["bgRemovedImage"] = image;
    // }

    const cartItem = {
      _id: "RA0001",
      name: "Custom",
      quantity: "1",
      color: clr,
      price:
        BASE_PRICE +
        Object.values(product)
          .map((a) => a.price)
          .reduce((a, b) => a + b, 0),
      size: size,
      brand: "MrRedash",
      img: Object.values(product).map((a) => a.image)[0],
      originalImage: product[side].originalImage,
      product: product,
    };

    dispatch(addToCart(cartItem));
  };
  const removeBackground = async () => {
    setLoading(true);
    // const formData = new FormData();
    // // convert base64 image to file
    // function b64toBlob(b64Data, contentType, sliceSize) {
    //   contentType = contentType || "";
    //   sliceSize = sliceSize || 512;

    //   var byteCharacters = atob(b64Data);
    //   var byteArrays = [];

    //   for (
    //     var offset = 0;
    //     offset < byteCharacters.length;
    //     offset += sliceSize
    //   ) {
    //     var slice = byteCharacters.slice(offset, offset + sliceSize);

    //     var byteNumbers = new Array(slice.length);
    //     for (var i = 0; i < slice.length; i++) {
    //       byteNumbers[i] = slice.charCodeAt(i);
    //     }

    //     var byteArray = new Uint8Array(byteNumbers);
    //     byteArrays.push(byteArray);
    //   }

    //   var blob = new Blob(byteArrays, { type: contentType });
    //   return blob;
    // }
    // let block = image.split(";");
    // let contentType = block[0].split(":")[1];
    // let realData = block[1].split(",")[1];
    // let blob = b64toBlob(realData, contentType);
    // let file = new File([blob], "image.png", { type: contentType });
    // formData.append("file", file);

    axios
      .post(microURL + "removebg/string", {
        image: image,
      })
      .then((res) => {
        let base64Data = res.data.data;
        setImage("data:image/png;base64," + base64Data);
        setIsBgRemoved(true);
      })
      .catch((err) => {
        alert("Something went wrong! Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addDesign = async () => {
    if (!originalImage && !image) {
      alert("Please upload an image to continue.");
      return;
    }
    let img = await html2canvas(document.querySelector("#placer")).then(
      (canvas) => {
        let data = canvas.toDataURL("image/jpg");
        return data;
      }
    );

    const newSide = {};
    newSide[side] = {
      image: img,
      originalImage: originalImage,
      designSize: dsize,
      price: dimen.price,
    };

    if (isbgRemoved) {
      newSide[side]["bgRemovedImage"] = image;
    }

    setProduct((prev) => ({
      ...prev,
      ...newSide,
    }));

    setOriginalImage("");
    setImage("");
  };

  useEffect(() => {
    if (document) {
      document.title = "Customise | MrRedash";
      document.head.querySelector('meta[name="description"]').content =
        "Customise your own t-shirt with Redash";
    }
  }, []);

  useEffect(() => {
    if (!side) return;
    // console.log(designSizes[side] && Object.keys(designSizes[side])[0]);
    setDSize(designSizes[side] && Object.keys(designSizes[side])[0]);

    setDimen(designSizes[side] && designSizes[side][dsize]);
  }, [side]);

  return (
    <MainLayout>
      <div className="customise">
        <div className="section">
          <h2>Getting Started</h2>
          <FormControl
            sx={{
              "&:focus": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                display: "none",
              },
            }}
          >
            <InputLabel id="size-label">Select Size</InputLabel>
            <Select
              labelId="size-label"
              id="size"
              label="Select Size"
              value={size && size}
              onChange={(e) => setSize(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  color: "white",
                  border: "1px solid white",
                },

                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              {["S", "M", "L", "XL", "XXL"].map((opt, i) => {
                return (
                  <MenuItem key={i} value={opt}>
                    {opt}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              "&:focus": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                display: "none",
              },
            }}
          >
            <InputLabel id="shirt-color-label">Color</InputLabel>

            <Select
              id="shirt-color"
              sx={{
                "& .MuiSelect-select": {
                  color: "white",
                  border: "1px solid white",
                },

                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
              onChange={(e) => {
                if (Object.keys(product).length > 0) {
                  if (
                    !window.confirm(
                      "Changing the color will remove all the designs. Do you want to continue?"
                    )
                  ) {
                    return;
                  } else {
                    setProduct({});
                  }
                }
                setClr(e.target.value);
                document.getElementById("tshirt-div").style.backgroundColor =
                  globalObject[e.target.value];
              }}
              label="Color"
              labelId="shirt-color-label"
              defaultValue={"white"}
            >
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="green">Green</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
              <MenuItem value="navy">Navy</MenuItem>
              <MenuItem value="maroon">Maroon</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              "&:focus": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                display: "none",
              },
            }}
          >
            <InputLabel id="side-label">Select Side</InputLabel>
            <Select
              labelId="side-label"
              id="side"
              label="Select Side"
              value={side && side}
              onChange={(e) => setSide(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  color: "white",
                  border: "1px solid white",
                },

                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              {designSizes &&
                Object.keys(designSizes).map((side, i) => {
                  return (
                    <MenuItem key={i} value={side}>
                      {side
                        .split("-")
                        .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
                        .join(" ")}
                    </MenuItem>
                  );
                })}
              {/* {options.map((opt, i) => {
                return (
                  <MenuItem key={i} value={opt}>
                    {opt.split("-").join(" ").toUpperCase()}
                  </MenuItem>
                );
              })} */}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              "&:focus": {
                borderColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                display: "none",
              },
            }}
          >
            <InputLabel id="design-size-label">Select Design Size</InputLabel>
            <Select
              labelId="design-size-label"
              id="design-size"
              label="Select Design Size"
              value={dsize && dsize}
              onChange={(e) => setDSize(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  color: "white",
                  border: "1px solid white",
                },

                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              {Object.keys(designSizes[side]).map((size, i) => {
                return (
                  <MenuItem key={i} value={size}>
                    {designSizes[side][size].name +
                      " +$" +
                      designSizes[side][size].price}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div id="placer" className="smiddle">
          <div id="tshirt-div">
            <img id="tshirt-backgroundpicture" />
            <canvas
              id="canvas-container"
              width="200"
              height="400"
              ref={canvasEl}
              style={{ border: "1px solid gray" }}
            ></canvas>
          </div>
        </div>
        <div className="section">
          {product && Object.keys(product).length > 0 && (
            <div>
              <h2>Designs</h2>
              <div className="designs">
                {Object.keys(product).map((side, i) => {
                  return (
                    <div key={i} className="design">
                      <img
                        src={product[side].image}
                        onClick={() => {
                          setDSize(product[side].designSize);
                          setSide(side);
                          setDimen(designSizes && designSizes[side][dsize]);

                          if (product[side].bgRemovedImage) {
                            setImage(product[side].bgRemovedImage);
                          } else setImage(product[side].originalImage);
                          setOriginalImage(product[side].originalImage);
                        }}
                      />
                      <h4>{side}</h4>
                      <Button
                        variant={"contained"}
                        onClick={() => {
                          let newProduct = { ...product };
                          delete newProduct[side];
                          setProduct(newProduct);
                        }}
                      >
                        X
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <Input
            type={"file"}
            inputProps={{ accept: "image/*" }}
            onChange={async (e) => {
              // convert to base64
              let file = e.target.files[0];

              let b64_string = await new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });

              setOriginalImage(b64_string);
              setImage(b64_string);
              setIsBgRemoved(false);

              e.target.value = "";
            }}
          />
          <Button
            variant={"contained"}
            onClick={() => removeBackground()}
            disabled={isbgRemoved || !image}
            sx={{
              "&:disabled": {
                color: "white",
                backgroundColor: "gray",
              },
            }}
          >
            Remove background
          </Button>
          <Button variant={"contained"} onClick={() => addDesign()}>
            Add Design
          </Button>

          <Button
            color={"secondary"}
            variant={"contained"}
            onClick={() => cart()}
          >
            Add to cart{" | "}
            <span style={{ marginLeft: "10px" }}>
              {" "}
              $
              {BASE_PRICE +
                Object.values(product)
                  .map((a) => a.price)
                  .reduce((a, b) => a + b, 0)}
            </span>
          </Button>
        </div>
      </div>
      {loading && <div className="loader">Loading...</div>}
    </MainLayout>
  );
};

export default CustomisePage;

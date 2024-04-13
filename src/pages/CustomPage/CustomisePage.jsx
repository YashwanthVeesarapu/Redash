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
import { microURL } from "../../utils/apiInstance";
import { set } from "firebase/database";

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

const BASE_PRICE = 10;

const designSizes = {
  front: {
    normal: { x: 8.5, y: 11, price: 20, name: "Normal" },
    normalLandscape: { x: 11, y: 8.5, price: 20, name: "Normal Landscape" },
    large: { x: 11, y: 17, price: 35, name: "Large" },
  },
  back: {
    normal: { x: 8.5, y: 11, price: 20, name: "Normal" },
    large: { x: 11, y: 17, price: 35, name: "Large" },
    normalLandscape: { x: 11, y: 8.5, price: 20, name: "Normal Landscape" },
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
  const [side, setSide] = useState("front");
  const [dimen, setDimen] = useState("");
  const [isbgRemoved, setIsBgRemoved] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [clr, setClr] = useState("white");

  const [resultUrl, setResultUrl] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const [canvas, setCanvas] = useState(null);

  // useEffect(() => {
  //   if (!canvas) {
  //     setCanvas(canvasEle);
  //   }
  // }, []);

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
      let imageUrl = isbgRemoved ? image : URL.createObjectURL(image);

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
    if (!originalImage) {
      alert("Please add your design image to continue.");
      return;
    }
    let canvasImg = canvasEl.current.toDataURL("image/png");
    let img = await html2canvas(document.querySelector("#placer")).then(
      (canvas) => {
        let data = canvas.toDataURL("image/jpg");
        return data;
      }
    );

    // convert original image to base64
    let b64OriginalImage = await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(originalImage);
    });

    const cartItem = {
      _id: "RA0001",
      name: "Custom",
      quantity: "1",
      color: clr,
      price: designSizes[dsize].price,
      size: "S",
      brand: "REDASH",
      img: img,
      originalImage: b64OriginalImage,
      designSize: dsize,
    };
    if (isbgRemoved) {
      cartItem["bgRemovedImage"] = image;
    }

    dispatch(addToCart(cartItem));
  };
  const removeBackground = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    axios
      .post(microURL + "removebg", formData)
      .then((res) => {
        let base64Data = res.data.data;
        setImage("data:image/png;base64," + base64Data);
        setIsBgRemoved(true);
        setLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong! Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (document) {
      document.title = "Customise | Redash";
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
                      {side.split("-").join(" ").toUpperCase()}
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

              {/* {designSizes &&
                Object.keys(designSizes).map((size, i) => {
                  return (
                    <MenuItem key={i} value={size}>
                      {designSizes[size].name +
                        " - $" +
                        designSizes[size].price}
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
          <Input
            type={"file"}
            inputProps={{ accept: "image/*" }}
            onChange={(e) => {
              setOriginalImage(e.target.files[0]);
              setImage(e.target.files[0]);
              setIsBgRemoved(false);
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

          <Button variant={"contained"} onClick={() => cart()}>
            Add to cart
          </Button>
        </div>
      </div>
      {loading && <div className="loader">Loading...</div>}
    </MainLayout>
  );
};

export default CustomisePage;

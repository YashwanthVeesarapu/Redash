import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  Button,
  Input,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

import { apiInstance } from "../../utils/apiInstance";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Product from "../../components/Product";

import "./styles.scss";

const AdminPage = () => {
  const [images, setImages] = useState();
  const [products, setAllProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("orders");

  const auth = getAuth();

  const [imagesUrlArray, setImagesUrlArray] = useState([]);
  const navigate = useNavigate();

  // product details

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");
  const [fit, setFit] = useState("");

  const [id, setId] = useState("");

  const [finalImages, setFinalImages] = useState({});
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState(["xs", "s", "m", "l", "xl"]);
  const [gender, setGender] = useState("female");

  const [launchDate, setLaunchDate] = useState();

  const [loading, setLoading] = useState(true);
  const [ploading, setPLoading] = useState(true);
  const [oloading, setOLoading] = useState(true);

  const [editModal, setEditModal] = useState(false);

  // onAuthStateChanged(auth, (user) => {
  //   setLoading(false);
  //   if (auth.currentUser?.email !== "hello@redash.us") {
  //     navigate("/");
  //   }
  // });

  async function getBase64(file) {
    let reader = new FileReader();

    return new Promise((resolve, reject) => {
      if (file.type == "image/webp") {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      } else {
        let url = URL.createObjectURL(file);
        const newImg = new Image();
        newImg.src = url;

        newImg.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = newImg.naturalWidth;
          canvas.height = newImg.naturalHeight;
          canvas.getContext("2d").drawImage(newImg, 0, 0);
          canvas.toBlob(
            (blob) => {
              // Now we have a `blob` containing webp data

              // Use the file rename trick to turn it back into a file
              const myImage = new File([blob], "img.webp", {
                type: blob.type,
              });

              reader.readAsDataURL(myImage);

              reader.onload = function () {
                let img = reader.result;
                resolve(img);
                console.log(img);
              };
            },
            "image/webp",
            0.7
          );
        };

        reader.onerror = function (error) {
          reject(error);
        };
      }
    });
  }

  async function assignImage(key, file, type) {
    if (file.size > 16 * 1024 * 1024) {
      alert("Max file size is 16mb");
    } else {
      finalImages[key] = await getBase64(file);
    }
  }

  const createNewProduct = (e) => {
    e.preventDefault();
    // let { name, brand, price, about, type, material, fit, launchDate } =
    //   e.target;

    const details = {
      model: name,
      type: type,
      material: material,
      fit: fit,
    };
    const productData = {
      name: name,
      brand: brand,
      price: price,
      sizes: sizes,
      colors: colors,
      about: about,
      details: details,
      images: finalImages,
      gender: gender,
      launch_date: launchDate,
    };

    apiInstance.post("/products", productData).then((res) => {
      if (res.status == 200) {
        alert("Poduct added successfully");
        setShowModal(false);
      }
    });
  };

  useEffect(() => {
    if (images == null) return;
    let arr = [];
    for (let i = 0; i < images.length; i++) {
      arr.push(URL.createObjectURL(images[i]));
    }

    setImagesUrlArray(arr);
  }, [images]);

  useEffect(() => {
    if (auth.currentUser?.email !== "hello@redash.us") {
      navigate("/");
    }
  }, [auth.currentUser]);

  const fetchProducts = () => {
    setPLoading(true);
    apiInstance
      .get(`/products/${1}`)
      .then((res) => {
        setAllProducts(res.data.results);
      })
      .finally(() => {
        setPLoading(false);
      });
  };

  const fetchOrders = () => {
    setOLoading(true);
    apiInstance
      .get(`/orders`, {
        headers: {
          Authorization: `Bearer ${auth.currentUser?.email}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .finally(() => {
        setOLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (oloading == false && ploading == false) {
      setLoading(false);
    }
  }, [oloading, ploading]);

  const showEditProductModal = (product) => {
    setEditModal(true);
    setShowModal(true);
    setName(product.name);
    setBrand(product.brand);
    setPrice(product.price);
    setAbout(product.about);
    setType(product.details.type);
    setMaterial(product.details.material);
    setFit(product.details.fit);
    setSizes(product.sizes);
    setColors(product.colors);
    setGender(product.gender);
    setLaunchDate(product.launch_date);
    setFinalImages(product.images);
    setId(product._id);
  };

  const editProduct = (e) => {
    e.preventDefault();

    const details = {
      type: type,
      material: material,
      fit: fit,
    };

    const productData = {
      name: name,
      brand: brand,
      price: price,
      sizes: sizes,
      colors: colors,
      about: about,
      details: details,
      images: finalImages,
      _id: id,
    };

    console.log(productData);

    apiInstance
      .put(`/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${auth.currentUser?.email}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          alert("Poduct updated successfully");
          setShowModal(false);
          setEditModal(false);
          fetchProducts();
        }
      })
      .catch((err) => {
        alert(err.response.data || "Something went wrong, Please try again");
      });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?"))
      apiInstance
        .delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.currentUser?.email}`,
          },
        })
        .then(() => {
          apiInstance.get(`/products/${1}`).then((res) => {
            setAllProducts(res.data.results);
            setLoading(false);
          });
        });
  };

  console.log(orders);

  return (
    <AdminLayout>
      <div className="admin">
        <div className="tab">
          <div
            className={tab == "products" ? "nav-item-active" : "nav-item"}
            onClick={() => setTab("products")}
          >
            Products
          </div>
          <div
            className={tab == "orders" ? "nav-item-active" : "nav-item"}
            onClick={() => setTab("orders")}
          >
            Orders
          </div>
        </div>
        <div className="tab-content">
          <Button onClick={() => setShowModal(true)}>Create New Product</Button>
          {tab == "products" && (
            <div className="products">
              {loading ? (
                <CircularProgress />
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map((p, i) => (
                  <div key={i}>
                    <Product {...p} />
                    <Button onClick={() => showEditProductModal(p)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteProduct(p._id)}>Delete</Button>
                  </div>
                ))
              ) : (
                <>
                  <p>Something went wrong, Sorry for the inconvinence.</p>
                  <p>This issue has been reported</p>
                </>
              )}
            </div>
          )}

          {tab == "orders" && (
            <div className="orders">
              {loading ? (
                <CircularProgress />
              ) : Array.isArray(orders) && orders.length > 0 ? (
                orders.map((o, i) => (
                  <div className="order" key={i}>
                    <h3 style={{ padding: 0, margin: 0 }}>#{o._id}</h3>
                    Date: {Date(o.createdDate)}
                    <h3>${o.total}</h3>
                    <p>Tracking: {o.tracking}</p>
                    <p>Status: {o.status}</p>
                  </div>
                ))
              ) : (
                <>
                  <p>No Order Data</p>
                </>
              )}
            </div>
          )}

          {showModal && (
            <div className="modal-newp">
              <h2>{editModal ? "Edit Product" : "Create New Product"}</h2>
              <form
                onSubmit={editModal ? editProduct : createNewProduct}
                className="newProductForm"
              >
                <Input
                  name="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <Input
                  name="brand"
                  placeholder="Brand"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                />
                <TextField
                  name="price"
                  placeholder="Price"
                  prefix="$"
                  variant="standard"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                <FormControl>
                  <InputLabel id="sizes-label">Sizes</InputLabel>
                  <Select
                    labelId="sizes-label"
                    label="Sizes"
                    name="sizes"
                    placeholder="Sizes"
                    multiple
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                  >
                    <MenuItem value="xs">XS</MenuItem>
                    <MenuItem value="s">S</MenuItem>
                    <MenuItem value="m">M</MenuItem>
                    <MenuItem value="l">L</MenuItem>
                    <MenuItem value="xl">XL</MenuItem>
                  </Select>
                </FormControl>

                <Input
                  onChange={(e) =>
                    setColors(
                      e.target.value.split(",").map(function (item) {
                        return item.trim().toLowerCase();
                      })
                    )
                  }
                  value={colors.join(",")}
                  name="colors"
                  placeholder="Colors"
                />

                {/* Assigning images according to colors */}

                {Array.isArray(colors) &&
                  colors.map((c, i) => (
                    <div key={i}>
                      <label>{c}</label>
                      {finalImages[c] !== undefined && (
                        <img height={"100px"} src={finalImages[c]} />
                      )}
                      <input
                        onChange={(e) => assignImage(c, e.target.files[0])}
                        name={c}
                        type="file"
                      />
                    </div>
                  ))}

                {/* <ImageList
            sx={{ height: "auto" }}
            variant="quilted"
            cols={2}
            rowHeight={121}
          >
            {Array.isArray(imagesUrlArray) &&
              imagesUrlArray.map((img, i) => (
                <ImageListItem key={i}>
                  <img src={img} loading="lazy" />
                </ImageListItem>
              ))}
          </ImageList> */}

                <Input
                  name="about"
                  placeholder="About"
                  multiline
                  rows={4}
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                />
                <Input
                  name="type"
                  placeholder="Type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                />
                <Input
                  name="material"
                  placeholder="Material"
                  onChange={(e) => setMaterial(e.target.value)}
                  value={material}
                />
                <Input
                  name="fit"
                  placeholder="Fit"
                  onChange={(e) => setFit(e.target.value)}
                  value={fit}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Launch Date"
                    onChange={(newValue) => setLaunchDate(newValue)}
                    value={launchDate}
                  />
                </LocalizationProvider>

                <FormControl>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    label="Gender"
                    name="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="unisex">Unisex</MenuItem>
                  </Select>
                </FormControl>

                <Button type="submit">
                  {editModal ? "Edit Product" : "Create Product"}
                </Button>
              </form>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;

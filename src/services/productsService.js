import { apiInstance } from "./index.js";

const getAllProducts = async (pagenum) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`/products/${pagenum}`)
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getAllProducts };

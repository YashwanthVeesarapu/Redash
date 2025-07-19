import { apiInstance } from ".";

const getAllProducts = async (pagenum: string) => {
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

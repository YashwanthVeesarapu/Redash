import { apiInstance } from ".";

const getAllDeals = async (pagenum: string) => {
  if (!pagenum || pagenum === "") {
    pagenum = "1";
  }
  return new Promise((resolve, reject) => {
    apiInstance
      .get(`/deals/${pagenum}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getAllDeals };

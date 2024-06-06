import axios from "axios";

const productsWebAddress = process.env.NEXT_PUBLIC_PRODUCTS_WEB_ADDRESS;
const productsApiCall = process.env.NEXT_PUBLIC_PRODUCTS_API_CALL;
const healthCheckApiCall = process.env.NEXT_PUBLIC_HEALTH_CHECK_API_CALL;
const tokenApiCall = process.env.NEXT_PUBLIC_CSRF_API_CALL;
const testitaulu = process.env.NEXT_PUBLIC_TESTITAULU_API_CALL;

export type ProductType = {
     id: string;
     productName: string;
     shoppingList: boolean;
};

/*****************************/
/***** HEALTH CHECK ******/
/*****************************/
export const DbHealthCheck = async (): Promise<boolean> => {
     let catchError;

     await axios
          .get(productsWebAddress + "/" + healthCheckApiCall)
          .then((response) => {
               console.log(response.data);

               const { id } = response.data;
               console.log(id);
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
          return false;
     }

     return true;
};

type dataType = {
     id: number;
     nimi: string;
};

export const GetTestitaulu = async (): Promise<dataType[]> => {
     let dataList: dataType[] = [];
     let catchError;

     await axios
          .get<dataType[]>(productsWebAddress + "/" + testitaulu)
          .then((response) => {
               dataList = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
          return [{ id: 0, nimi: "empty" }];
     }

     return dataList;
};

/*****************************/
/***** GET ALL PRODUCTs ******/
/*****************************/
export const GetProducts = async (): Promise<ProductType[]> => {
     let products: ProductType[] = [];
     let catchError;

     await axios
          .get<ProductType[]>(productsWebAddress + "/" + productsApiCall)
          .then((response) => {
               products = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
          return [{ id: "0", productName: "empty", shoppingList: false }];
     }

     return products;
};

/************************/
/***** ADD PRODUCT ******/
/************************/
export const AddNewProduct = async (data: ProductType) => {
     console.log(data);

     try {
          const response = await axios.post(
               productsWebAddress + "/" + productsApiCall,
               { data },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Data updated successfully:", response.data);
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/********************************/
/***** UPDATE PRODUCT NAME ******/
/********************************/
export const updateProductName = async (id: string, name: string) => {
     try {
          const response = await axios.put(
               productsWebAddress + "/" + productsApiCall + `/${id}`,
               { productName: name },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Product updated successfully:", response.data);
     } catch (error) {
          console.error("Error updating product:", error);
     }
};

/***************************/
/***** DELETE PRODUCT ******/
/***************************/
export const deleteProductFromDB = async (id: string) => {
     try {
          const response = await axios.delete(
               productsWebAddress + "/" + productsApiCall + `/${id}`,
               {
                    headers: { "Content-Type": "application/json" },
               }
          );

          console.log("Data deleted successfully:", response.data);
     } catch (error) {
          console.error("Error deleting data:", error);
     }
};

/*** TEST */

type shoppingListsType = {
     id: number;
     name: string;
};

/*************************************/
/***** GET SHOPPINGLIST By USER ******/
/*************************************/
export const GetShoppingListsByUserId = async (
     userId: number
): Promise<shoppingListsType[]> => {
     let shoppingLists: shoppingListsType[] = [];
     let catchError;

     await axios
          .get<shoppingListsType[]>(productsWebAddress + "/" + productsApiCall)
          .then((response) => {
               shoppingLists = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
     }

     return shoppingLists;
};

/*************************************/
/*************************************/
/***********TOKEN TEST *****/
/*************************************/

/*************************************/
/***** GET TOKEN ******/
/*************************************/
export const GetToken = async (): Promise<string> => {
     let token: string = "";
     let catchError;

     await axios
          .get<string>(productsWebAddress + "/" + tokenApiCall)
          .then((response) => {
               token = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
     }

     return token;
};

export const deleteToken = async (token: string) => {
     try {
          const response = await axios.post(
               productsWebAddress + "/updateprofile",
               { name: "Nimmari!" },
               {
                    headers: {
                         "Content-Type": "application/json",
                         "CSRF-Token": token,
                    },
               }
          );

          console.log("Token deleted successfully:", response.data);
     } catch (error) {
          console.error("Error deleting Token:", error);
     }
};

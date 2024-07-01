import axios, { AxiosError } from "axios";
import {
     ProductType,
     ShoppingListProductsType,
     ShoppingListType,
     User,
     UserType,
} from "./types";

const ipAddress = process.env.NEXT_PUBLIC_PRODUCTS_WEB_ADDRESS_V3;
const usersApi = process.env.NEXT_PUBLIC_API_USERS_V3;
const productsApi = process.env.NEXT_PUBLIC_API_PRODUCTS_V3;
const shoppingListsApi = process.env.NEXT_PUBLIC_API_SHOPPINGLISTS_V3;
const shoppingListProductsApi =
     process.env.NEXT_PUBLIC_API_SHOPPINGLIST_PRODUCTS_V3;
const adminsApi = process.env.NEXT_PUBLIC_API_ADMINS_V3;

const emptyShoppingListProducts: ShoppingListProductsType = {
     id: 0,
     name: "Empty product",
     description: "",
     checked: false,
};

/*****************************/
/***** GET all users *********/
/*****************************/
export const GetAllUsers = async (): Promise<UserType[] | null> => {
     console.log("*** GetAllUsers ***");

     const apiClause = `${ipAddress}/users`;

     try {
          const response = await axios.get(apiClause, {
               withCredentials: true, // Include credentials such as cookies
          });
          return response.data;
     } catch (error) {
          console.error("Error fetching data:", error);
          return null;
     }
};

/************************/
/***** UPDATE user ******/
/************************/
export const UpdateUserName = async (user: User): Promise<boolean> => {
     console.log("*** Update user ***");

     const id = user.id;
     const name = user.name;

     try {
          const response = await axios.patch(
               `${ipAddress}/users/${id}`,
               {
                    name,
               },
               { withCredentials: true }
          );
          console.log("User updated:", response.data);
     } catch (error) {
          console.error("Error updating user:", error);
     } finally {
          return true;
     }
};

/*****************************/
/***** GET all products ******/
/*****************************/
export const GetAllProducts = async (): Promise<ProductType[]> => {
     console.log(" ** GetAllProducts **");

     let products: ProductType[] = [];
     let catchError;

     const apiClause = `${ipAddress}/${productsApi}`;

     await axios
          .get<[]>(apiClause)
          .then((response) => {
               console.log(response.data);
               const responseData: ProductType[] = response.data;
               products = responseData.map((x) => ({
                    ...x,
                    description: x.description || "",
               }));
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetProducts error");
          return [
               {
                    id: 0,
                    name: "empty",
                    description:
                         "This is empty product. Getting products did not work!",
               },
          ];
     }
     return products;
};

/*****************************/
/***** Add new product  ******/
/*****************************/
export const AddNewProduct = async (productName: string) => {
     console.log(" ** AddNewProduct **");

     const apiClause = `${ipAddress}/${productsApi}`;

     try {
          const response = await axios.post(
               apiClause,
               { name: productName, description: "" },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Data insert successfully:", response.data);
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/********************************/
/***** Update product name ******/
/********************************/
export const UpdateProductNameById = async (id: number, name: string) => {
     console.log(" ** UpdateProductNameById **");

     const apiClause = `${ipAddress}/${productsApi}/${id}`;

     try {
          const response = await axios.patch(
               apiClause,
               { name: name },
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

/****************************/
/***** Delete product  ******/
/****************************/
export const DeleteProduct = async (productid: number) => {
     console.log(" ** DeleteProduct **");

     const apiClause = `${ipAddress}/${productsApi}/${productid}`;

     try {
          const response = await axios.delete(apiClause, {
               headers: {
                    "Content-Type": "application/json",
               },
          });
          console.log(
               "Product removed successfully from shoppinglist! Status:",
               response.status
          );
     } catch (error) {
          console.error("Error removing product from shoppinglist:", error);
     }
};

/*****************************************/
/***** GET shopping lists by userID ******/
/*****************************************/
export const GetShoppingListsByUserId = async (
     userId: number
): Promise<ShoppingListType[] | { message: string } | null> => {
     console.log("GetShoppingListsByUserId");

     let shoppingLists: ShoppingListType[] | null = null;
     let message: string | null = null;
     let catchError;

     const apiClause = `${ipAddress}/${shoppingListsApi}/user/${userId}`;

     await axios
          .get<ShoppingListType[] | { message: string }>(apiClause)
          .then((response) => {
               if (Array.isArray(response.data)) {
                    shoppingLists = response.data;
                    console.log("Shopping lists:", shoppingLists);
               } else if (response.data && "message" in response.data) {
                    message = response.data.message;
                    console.log("Message:", message);
                    return message;
               }
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetShoppingListsByUserId error");
          return null;
     }
     return shoppingLists;
};

/********************************************/
/***** Add new shopping list for user  ******/
/********************************************/
export const AddNewShoppingListForUser = async (
     name: string,
     userId: number
) => {
     console.log("AddNewShoppingListForUser");

     const apiClause = `${ipAddress}/${shoppingListsApi}/new`;

     try {
          const response = await axios.post(
               apiClause,
               {
                    name: name,
                    user_id: userId,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );
          console.log("Data insert successfully! Status: ", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/**************************************/
/***** Update shopping list name ******/
/**************************************/
export const UpdateShoppingListName = async (id: number, name: string) => {
     console.log("UpdateShoppingListName");

     const apiClause = `${ipAddress}/${shoppingListsApi}/${id}`;

     try {
          const response = await axios.patch(
               apiClause,
               {
                    id: id,
                    name: name,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log(
               "Shopping list name updated successfully:",
               response.data
          );
     } catch (error) {
          console.error("Error updating shopping list name:", error);
     }
};

/**********************************/
/***** Remove shopping list  ******/
/**********************************/
export const RemoveShoppingList = async (id: number) => {
     console.log("RemoveShoppingList");

     const apiClause = `${ipAddress}/${shoppingListsApi}/${id}`;

     try {
          const response = await axios.delete(apiClause, {
               headers: {
                    "Content-Type": "application/json",
               },
          });

          console.log("Shopping list removed successfully:", response.data);
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error removing shopping list:", error);
     }
};

/*********************************************************/
/***** GET shopping list products by shoppinglistID ******/
/*********************************************************/
export const GetShoppingListProductsByShoppingListId = async (
     id: number
): Promise<ShoppingListProductsType[]> => {
     console.log("GetShoppingListProductsByShoppingListId");

     let shoppingListProducts: ShoppingListProductsType[] = [];
     let catchError;

     const apiClause = `${ipAddress}/${shoppingListProductsApi}/shoppinglistproducts/${id}`;

     await axios
          .get<ShoppingListProductsType[]>(apiClause)
          .then((response) => {
               console.log("result:: ", response);

               shoppingListProducts = response.data;
          })
          .catch((error) => {
               console.error("There was an error!", error);
               catchError = error;
          });

     if (catchError) {
          console.log("GetShoppingListProductsByShoppingListId error");
          return [emptyShoppingListProducts];
     }

     return shoppingListProducts;
};

/***************************************************/
/***** Update product checked in shoppinglist ******/
/***************************************************/
export const UpdateProductCheckedInShoppingListByShoppingListIdAndProductId =
     async (shoppingListId: number, productId: number, checked: boolean) => {
          console.log(
               "UpdateProductCheckedInShoppingListByShoppingListIdAndProductId"
          );

          const apiClause = `${ipAddress}/${shoppingListProductsApi}/${shoppingListId}`;

          try {
               const response = await axios.patch(
                    apiClause,
                    {
                         shoppinglist_id: shoppingListId.toString(),
                         product_id: productId.toString(),
                         is_checked: checked.toString(),
                    },
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

/***************************************************/
/***** Add new product to shoppinglist *************/
/***************************************************/
export const AddNewProductToShoppingList = async (
     shoppinglistid: number,
     productid: number
) => {
     console.log("AddNewProductToShoppingList");

     const apiClause = `${ipAddress}/${shoppingListProductsApi}`;

     try {
          const response = await axios.post(
               apiClause,
               {
                    shoppinglist_id: shoppinglistid,
                    product_id: productid,
                    is_checked: false,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );

          console.log("Data insert successfully:", response.data);
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/****************************************************/
/***** Remove product from shoppinglist *************/
/****************************************************/
export const RemoveProductFromShoppingList = async (
     shoppingListId: number,
     productId: number
) => {
     console.log("RemoveProductFromShoppingList");

     const apiClause = `${ipAddress}/${shoppingListProductsApi}/${shoppingListId}/product/${productId}`;

     try {
          const response = await axios.delete(apiClause, {
               headers: {
                    "Content-Type": "application/json",
               },
          });

          console.log(
               "Product removed successfully from shoppinglist:",
               response.data
          );
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error removing product from shoppinglist:", error);
     }
};

/********************************************/
/***** Add new admin  ***********************/
/********************************************/
export const AddNewAdmin = async (username: string, password: string) => {
     console.log("*** AddNewAdmin ***");

     const apiClause = `${ipAddress}/${adminsApi}/new`;

     try {
          const response = await axios.post(
               apiClause,
               {
                    username: username,
                    password: password,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
               }
          );
          console.log("Status:", response.status);
     } catch (error) {
          console.error("Error updating data:", error);
     }
};

/*********************************************************/
/***** GET Admin *****************************************/
/*********************************************************/
export const GetAdminByUserNameAndPassword = async (
     username: string,
     password: string
): Promise<boolean> => {
     console.log("*** GetAdminByUserNameAndPassword ***");

     const apiClause = `${ipAddress}/${adminsApi}/login`;

     try {
          const response = await axios.post(apiClause, { username, password });

          if (response.status === 200) {
               console.log("Authentication successful!");
               return true;
          } else if (response.status === 401) {
               // No Content
               console.log("No content returned from the API!");
               return false;
          }
          console.log("Returned OK, but something...");
          return false;
     } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
               // Error from server side
               console.error(
                    "Error fetching data:",
                    axiosError.response.status,
                    axiosError.response.data
               );
               // Handling specific status codes in error cases
               switch (axiosError.response.status) {
                    case 401:
                         console.error("Unauthorized access.");
                         break;
                    case 403:
                         console.error("Access forbidden.");
                         break;
                    case 404:
                         console.error("Resource not found.");
                         break;
                    case 500:
                         console.error("Internal server error.");
                         break;
                    default:
                         console.error("An unexpected error occurred.");
                         break;
               }
          } else if (axiosError.request) {
               // The request was made but no response was received
               console.error("No response received:", axiosError.message);
          } else {
               // Something happened in setting up the request
               console.error("Error setting up request:", axiosError.message);
          }
          return false;
     }
};

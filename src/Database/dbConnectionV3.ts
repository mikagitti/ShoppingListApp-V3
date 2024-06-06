import axios, { AxiosError } from "axios";

const ipAddress = process.env.NEXT_PUBLIC_PRODUCTS_WEB_ADDRESS_V3;
const usersApi = process.env.NEXT_PUBLIC_API_USERS_V3;
const productsApi = process.env.NEXT_PUBLIC_API_PRODUCTS_V3;
const shoppingListsApi = process.env.NEXT_PUBLIC_API_SHOPPINGLISTS_V3;
const shoppingListProductsApi =
     process.env.NEXT_PUBLIC_API_SHOPPINGLIST_PRODUCTS_V3;
const adminsApi = process.env.NEXT_PUBLIC_API_ADMINS_V3;

export type User = {
     id: number;
     name: string;
};

export type ProductType = {
     id: number;
     name: string;
     description: string;
};

/*****************************/
/***** GET all users ******/
/*****************************/
export const GetAllUsers = async (): Promise<User[] | null> => {
     console.log(" ** Version 3 - GetAllUsers **");

     let users: User[] = [];

     const apiClause = `${ipAddress}/users`;
     console.log(apiClause);

     try {
          const response = await axios.get(apiClause, {
               withCredentials: true, // Include credentials such as cookies
          });

          console.log(response.data);
          return response.data;
     } catch (error) {
          console.error("Error fetching data:", error);
          return null;
     }
};

/************************/
/***** UPDATE user ******/
/************************/
export const UpdateUserData = async (user: User): Promise<boolean> => {
     console.log("Update user");
     console.log(user);

     const id = user.id;
     const username = user.name;

     try {
          const response = await axios.patch(
               `${ipAddress}/users/${id}`,
               {
                    username,
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
     console.log(apiClause);

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
     const apiClause = `${ipAddress}/${productsApi}`;
     console.log(apiClause);

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

export type User = {
     id: number;
     name: string;
};

export type UserType = {
     id: number;
     name: string;
};

export type ProductType = {
     id: number;
     name: string;
     description: string;
};

export type ShoppingListType = {
     id: number;
     name: string;
     user_id: number;
};

export type ShoppingListProductsType = {
     id: number;
     name: string;
     description: string;
     checked: boolean;
};

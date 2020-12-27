import {Address} from 'expo-location'

export interface CategoryModel {
  name: string;
  category: string;
  icon: string;
}

export interface RestaurantModel {
  id_restaurant: number;
  restaurant_name: string;
  restaurant_description: string;
  image: string;
}

export interface foodModel {
  id_product: number;
  id_product_category_fk: number;
  id_product_sub_cat_fk: number;
  id_supplier_fk: number;
  product_name: string;
  product_description: string;
  image: string;
  images: string;
  product_price: number;
}

export interface UserModel {
  id_customer: number;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserState{
    user: UserModel;
    location: Address;
    error: string | undefined
}

export interface RestaurantState{
    restaurant: RestaurantModel
    //add others
}

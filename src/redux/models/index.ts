import {Address} from 'expo-location'

export interface CategoryModel {
  name: string;
  category: string;
  icon: string;
}

export interface RestaurantModel {
  id_supplier: number;
  supplier_name: string;
  supplier_description: string;
  supplier_image: string;
  createdAt: Date;
  updatedAt: Date;
  food: [FoodModel]
}

export interface FoodModel {
  id_product: number;
  id_product_category: number;
  id_product_sub_cat: number;
  id_supplier: number;
  category: string;
  subcategory:string;
  store:string;
  product_name: string;
  product_description: string;
  image: string;
  images: string;
  product_price: number;
  quantity:number,
}

export interface foodAvailability{
  categories: CategoryModel;
  restaurant: RestaurantModel;
  food: FoodModel
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
    restaurants_avail: RestaurantModel;
    categories: CategoryModel;
    food: FoodModel
    //add others
}

import { User } from "./user";

export interface IOrder {
  _id: string;
  user: User
  address:string
  phone:number
  total: number;
  status: 'Pending' | 'Shipped' | 'Completed' | 'Canceled';
  placedAt: string;
}
export interface IPlaceOrder {
  _id: string;
  address:string
  phone:number
  products:string[]
}
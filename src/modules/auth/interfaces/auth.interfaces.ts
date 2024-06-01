export interface LoginInterface {
    email: string;
    password: string;
  }

export interface UserInterface{
  _id:string,
  email:string,
  password:string,
  phoneNumber?:string,
  username?:string
}
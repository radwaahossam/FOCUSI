// export interface AuthUser {
//     name: string,
//     email: string,
//     password: string,
//     rePassword: string,
//     childAge: number,
//     gender: string
// }

export interface AuthUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
}



export interface loginUser {
    email: string,
    password: string,
}
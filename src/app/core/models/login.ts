export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginRes {
  JWT: string;
}

export interface IJWT {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export type LoginResponse = {
  message: string;
  statusCode: number;
  accessToken: string;
};

export type RegisterResponse = {
  message: string;
  statusCode: number;
};

export type User = {
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
};

export type UserResponse = {
  statusCode: number;
  user: User;
};

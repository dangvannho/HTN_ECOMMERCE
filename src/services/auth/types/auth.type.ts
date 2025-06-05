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

export type ForgotPasswordResponse = {
  statusCode: number;
  message: string;
  data: {
    EC: number;
    EM: string;
  };
};

export type ResetPasswordResponse = {
  statusCode: number;
  message: string;
  data: {
    EC: number;
    EM: string;
  };
};

export type RefreshTokenResponse = {
  accessToken: string;
};

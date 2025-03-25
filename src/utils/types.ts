export type authSliceTypes = {
  user: { id: String | null; role: String | null; name: String | null } | null;
  token: String | null;
  isAuthenticated: boolean;
};

export type loginCredentialsTypes = {
  email: String;
  password: String;
};

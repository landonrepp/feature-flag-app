
export type User = {
  id: string;
  name: string;
  email: string;
  googleId: string;
};

export type InsertUser = {
  name: string;
  email: string;
  googleId: string;
}
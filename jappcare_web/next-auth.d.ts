import "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    name: string;
    id: string;
    accessToken: string;
    refreshToken: string;
    expiry: number;

  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
}
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }
}


export { };

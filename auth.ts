import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/data";
import { hash } from "crypto";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        user = await getUserByEmail(credentials.email as string);
        const hashedPassword = bcrypt.hashSync(credentials.password as string, 10);
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }

        const isPaasswordValid = await bcrypt.compare(credentials.password as string, hashedPassword);

        if (!isPaasswordValid) {
          throw new Error("Password is not valid.")
        }
 
        // return user object with the their profile data
        return user
      },
    }),

  ],
})
import { GoogleStrategy } from "remix-auth-google";
import { authenticator } from "./authenticator.server";
import { db } from "./db.server";
import type { InsertUser, User } from "../types/user";

export function setup() {
  let googleStrategy = new GoogleStrategy(
    {
      clientID:
        "clientId",
      clientSecret: "clientSecret",
      callbackURL: "https://local.landonrepp.com:3000/auth/google/callback",
    },
    async ({
      accessToken,
      refreshToken,
      extraParams,
      profile,
    }): Promise<User> => {
      // Get the user data from your DB or API using the tokens and profile
      const database = await db;
      const userQuery = await database.query<User[]>(
        /* surrealql */ `select id, email, name from users where email = $email`,
        {
          email: profile.emails[0].value,
        }
      );
      if (userQuery.length > 1) {
        throw new Error("More than one user found");
      }
      if (userQuery.length === 1) {
        let userRecord = userQuery[0].result;
        if (!userRecord) {
          throw new Error("User record not found");
        }
        return {
          id: userRecord.id,
          email: userRecord.email,
          name: userRecord.name,
          googleId: profile.id,
        };
      }

      const [insertUser]: User[] = await database.create<InsertUser>(`users`, {
        email: profile.emails[0].value,
        name: profile.displayName,
        googleId: profile.id,
      });

      return insertUser;
    }
  );

  authenticator.use(googleStrategy);
}

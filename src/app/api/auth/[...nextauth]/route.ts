import NextAuth, { Account, AuthOptions, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db";

export const authOptions = {
  //   Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account;
      profile: Profile;
    }) {
      const email = user.email;
      if (!email) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };

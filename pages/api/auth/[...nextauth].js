import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope: 'profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly   https://www.googleapis.com/auth/calendar.settings.readonly '
        }
    },

     
      // Add additional scopes as needed
    })
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl+"/instructor/mydashboard";
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.googleId = account.providerAccountId;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session = token;
      return session;
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

export default NextAuth(options);

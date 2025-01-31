import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito";
const handler = NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID!,
            clientSecret: process.env.COGNITO_SECRET!,
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token;
        },
        async session({ session, token }) {
            console.log(token);
            session.accessToken = token.accessToken as string;
            return session;
        }
    },
});

export { handler as GET, handler as POST };
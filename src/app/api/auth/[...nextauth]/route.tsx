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
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.accessToken = account.access_token;
                token.address = profile.address;
                token.birthdate = profile.birthdate;
                token.email = profile.email;
                token.given_name = profile.given_name;
                token.family_name = profile.family_name;
            }
            return token;
        },
        async session({ session, token }) {
            console.log(token);
            session.accessToken = token.accessToken as string;
            session.user = {
                ...session.user,
                id: token.sub as string,
                address: token.address as string,
                birthdate: token.birthdate as string,
                email: token.email as string,
                given_name: token.given_name as string,
                family_name: token.family_name as string,
            };
            return session;
        }
    },
});

export { handler as GET, handler as POST };
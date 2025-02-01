import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id?: string;
            address?: string;
            birthdate?: string;
            email?: string;
            given_name?: string;
            family_name?: string;
        }

    }
    interface JWT {
        accessToken?: string;
    }
    interface Profile {
        address?: string;
        birthdate?: string;
        email?: string;
        given_name?: string;
        family_name?: string;
    }
}
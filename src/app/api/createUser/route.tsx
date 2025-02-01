import User from "@/app/types/User";
import { db } from "../../database/dynamoDB";

export async function POST (request: Request) {
    const data = await request.json();
    if (!data) {
        return Response.json({error: "No request body found"}, { status: 400 });
    }
    const {id, email, address, birthdate, given_name, family_name} = data;

    const u: User = new User(
        id,
        email,
        address,
        birthdate,
        given_name,
        family_name
    );
    await db.put({TableName: "Users", Item: u})
    return Response.json({ data: u.user_id }, { status: 201 });
}

// Use zod-form-data to format request based on types
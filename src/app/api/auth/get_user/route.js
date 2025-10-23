import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { GET_USER } from "@/services/graphql/queries/getUser";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const userId = body.userId;

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required." },
                { status: 400 }
            );
        }

        const variables = { userId };

        const response = await fetchGraphQL(GET_USER, variables);

        if (response.errors) {
            return NextResponse.json(
                { errors: response.errors },
                { status: 500 }
            );
        }

        const userData = response.data.getUser;

        return NextResponse.json({ user: userData }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "An unexpected error occurred", details: error.message },
            { status: 500 }
        );
    }
}
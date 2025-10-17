import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { SEND_PASSWORD_RESET } from "@/services/graphql/mutations/sendPasswordReset";
import { NextResponse } from "next/server"

export async function GET(request){
    try {
        const { email } = await request.json();

        if(!email){
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        const variables = { email };

        const response = await fetchGraphQL(SEND_PASSWORD_RESET, variables);

        if(response.errors){
            return NextResponse.json(
                { errors: response.errors },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: "OK." },
            { status: 200 }
        )
    } catch(error) {
        return NextResponse.json(
            { error: "An unexpected error occurred", details: error.message },
            { status: 500 }
        );
    }
}
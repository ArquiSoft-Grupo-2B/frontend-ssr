import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { CREATE_USER } from "@/services/graphql/mutations/createUser";
import { NextResponse } from "next/server"

export async function POST(request){
    try{
        const { email , password, alias} = await request.json();

        if (!email || !alias || !password) {
            return NextResponse.json(
                { error: "Email, password and alias are required." },
                { status: 400 }
            );
        }

        const variables = { email, password, alias};

        const response = await fetchGraphQL(CREATE_USER, variables);

        if(response.errors){
            return NextResponse.json(
                { errors: response.errors },
                { status: 500 }
            );
        }

        const registeredData = response.data.createUser

        return NextResponse.json(
            { message: "User registered correctly.", user: registeredData},
            { status: 200 }
        );

    } catch(error){
        return NextResponse.json(
            { error: "An unexpected error occurred", details: error.message },
            { status: 500 }
        );
    }
};
import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { VERIFY_TOKEN } from "@/services/graphql/mutations/verifyToken";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {

    const token = await request.json();

    if (!token) {
        return NextResponse.json(
            { error: "Token is required." },
            { status: 400 }
        );
    }

    const variables = { token };

    const response = await fetchGraphQL(VERIFY_TOKEN, variables, token);

    if (response.errors) {
        return NextResponse.json(
            { errors: response.errors },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { message: "Token verified successfully", data: response.data.verifyToken },
        { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { UPDATE_USER } from "@/services/graphql/mutations/updateUser";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { email, password, alias } = await request.json();

    if (!email || !alias) {
      return NextResponse.json(
        { error: "Email and alias are required." },
        { status: 400 }
      );
    }

    const variables = { email, password, alias };

    const response = await fetchGraphQL(UPDATE_USER, variables);

    if (response.errors) {
      return NextResponse.json(
        { errors: response.errors },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", data: response.data.updateUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { UPDATE_USER } from "@/services/graphql/mutations/updateUser";
import { VERIFY_TOKEN } from "@/services/graphql/mutations/verifyToken";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const verifyResponse = await fetchGraphQL(VERIFY_TOKEN, { token });

    if (verifyResponse.errors || !verifyResponse.data.verifyToken.valid) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { email, password, alias } = await request.json();

    if (!email || !alias) {
      return NextResponse.json(
        { error: "Email and alias are required." },
        { status: 400 }
      );
    }

    const variables = { email, password, alias };

    const response = await fetchGraphQL(UPDATE_USER, variables, token);

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
import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { LOGIN_USER } from "@/services/graphql/mutations/loginUser";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if(!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }
    
    const variables = { email, password };

    const response = await fetchGraphQL(LOGIN_USER, variables);

    if (response.errors) {
      return NextResponse.json(
        { errors: response.errors },
        { status: 500 }
      );
    }

    const loginData = response.data.loginUser;

    return NextResponse.json({ message: "User logged correctly.", user: loginData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
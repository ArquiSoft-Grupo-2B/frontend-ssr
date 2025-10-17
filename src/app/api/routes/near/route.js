import { fetchNearbyRoutes } from "@/services/routesService";
import { NextResponse } from "next/server"

export async function GET(request){
    try {
        const { lat, lng, radius } = await request.json();

        if(!lat || !lng){
            return NextResponse.json(
                { error: "User location is required."},
                { status: 400 }
            );
        }

        const variables = { lat, lng, radius };

        const response = await fetchNearbyRoutes(lat,lng,radius);

        if(response.errors){
            return NextResponse.json(
                { errors: response.errors },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Near routes obtained." },
            { status: 200 }
        );
    } catch(error){
        return NextResponse.json(
            { error: "An unexpected error occurred", details: error.message },
            { status: 500 }
        );
    }
}
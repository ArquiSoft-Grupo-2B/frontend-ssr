import { completeRoute } from "@/services/routesService";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const authToken = request.headers.get("Authorization")?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json(
        { error: "No se ha iniciado sesión" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { timeTaken } = await request.json();

    if (!timeTaken && timeTaken !== 0) {
      return NextResponse.json(
        { error: "El tiempo tomado es requerido" },
        { status: 400 }
      );
    }

    const data = await completeRoute(id, timeTaken, authToken);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al completar la ruta:", error);
    return NextResponse.json(
      { error: "Error al completar la ruta" },
      { status: 500 }
    );
  }
}

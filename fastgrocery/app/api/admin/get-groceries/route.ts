import Grocery from "@/app/models/grocery.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const groceries = await Grocery.find({});

    return NextResponse.json(groceries);
  } catch (error) {
    console.error("Get groceries error:", error);

    return NextResponse.json(
      { message: "Error fetching groceries" },
      { status: 500 }
    );
  }
}

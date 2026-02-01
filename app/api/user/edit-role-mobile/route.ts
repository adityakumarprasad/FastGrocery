import User from "@/app/models/user.model";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { role, mobile } = await request.json();
    const session = await auth();
    const user = await User.findOneAndUpdate({ email: session?.user?.email }, { role, mobile }, { new: true });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User role and mobile updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error: ${error}` }, { status: 500 });

  }


}
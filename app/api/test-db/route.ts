import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connecttodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json(
      {
        success: true,
        message: "✅ MongoDB Connected Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Connection Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "❌ MongoDB Connection Failed",
      },
      { status: 500 }
    );
  }
}
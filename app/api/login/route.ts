import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/connecttodb";
import { generateToken } from "@/lib/jwt";
import Admin from "@/lib/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = generateToken({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
    });

    // Response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      },
      { status: 200 }
    );

    // Save token in HTTP-only cookie
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/connecttodb";
import Admin from "@/lib/models/Admin";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
   console.log("ReadyState:", mongoose.connection.readyState);
console.log("DB Name:", mongoose.connection.name);
console.log("Host:", mongoose.connection.host);

    const existingAdmin = await Admin.findOne({
      email: "admin@insurance.com",
    });

    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@insurance.com",
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
  console.error("CREATE ADMIN ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Something went wrong.",
      error: error instanceof Error ? error.message : String(error),
    },
    {
      status: 500,
    }
  );
}
}
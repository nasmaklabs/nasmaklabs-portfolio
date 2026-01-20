import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET all jobs (including inactive) for admin
export async function GET() {
  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Job = (await import("@/lib/models/Job")).default;
    
    await connectDB();
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

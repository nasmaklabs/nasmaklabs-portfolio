import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET all jobs
export async function GET() {
  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Job = (await import("@/lib/models/Job")).default;
    
    await connectDB();
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST new job
export async function POST(req: NextRequest) {
  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Job = (await import("@/lib/models/Job")).default;
    
    await connectDB();
    const data = await req.json();
    const job = await Job.create(data);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

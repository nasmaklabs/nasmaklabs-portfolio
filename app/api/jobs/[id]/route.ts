import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// DELETE job
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Job = (await import("@/lib/models/Job")).default;
    
    await connectDB();
    const { id } = await params;
    await Job.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

// PATCH job (toggle active)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    const Job = (await import("@/lib/models/Job")).default;
    
    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const job = await Job.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

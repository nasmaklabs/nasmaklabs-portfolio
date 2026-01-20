"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { CustomCursor } from "@/components/cursor/CustomCursor";

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setJobs([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-[#030303] text-white">
        {/* Header */}
        <div className="relative py-32 px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #00A651 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#00A651] transition-colors mb-8"
              data-hover
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Join Our <span className="text-[#00A651]">Team</span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/50 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Build the future of technology with us. We're looking for passionate
              individuals ready to make an impact.
            </motion.p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="relative px-6 md:px-12 pb-24">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#00A651] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : jobs.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-2xl text-white/30 mb-4">No open positions right now</p>
                <p className="text-white/50">Check back later or send your CV to hr@nasmaklabs.com</p>
              </motion.div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00A651]/30 transition-all cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedJob(job)}
                    whileHover={{ y: -4 }}
                    data-hover
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#00A651] transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-2">
                            <FaBriefcase className="w-3 h-3" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <FaClock className="w-3 h-3" />
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        className="flex items-center gap-2 text-[#00A651]"
                        whileHover={{ x: 5 }}
                      >
                        View Details
                        <FaArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                data-hover
              >
                ✕
              </button>

              <span className="inline-block px-3 py-1 text-xs rounded-full bg-[#00A651]/20 text-[#00A651] mb-4">
                {selectedJob.department}
              </span>

              <h2 className="text-3xl font-bold mb-4">{selectedJob.title}</h2>

              <div className="flex flex-wrap gap-4 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="w-3 h-3" />
                  {selectedJob.type}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">About the Role</h4>
                <p className="text-white/60 leading-relaxed whitespace-pre-line">
                  {selectedJob.description}
                </p>
              </div>

              {selectedJob.requirements.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A651] mt-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={`mailto:hr@nasmaklabs.com?subject=Application for ${selectedJob.title}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#00A651] text-black font-semibold rounded-full hover:bg-[#00A651]/90 transition-colors"
                data-hover
              >
                Apply Now
                <FaArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  );
}

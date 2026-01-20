"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

const ADMIN_PASSWORD = "nasmak2024";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/all");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchJobs();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: "",
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.join("\n"),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = formData.requirements
      .split("\n")
      .filter((r) => r.trim());

    if (editingJob) {
      // Update existing job
      await fetch(`/api/jobs/${editingJob._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, requirements }),
      });
    } else {
      // Create new job
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, requirements }),
      });
    }

    resetForm();
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    fetchJobs();
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-4">
        <motion.form
          onSubmit={handleLogin}
          className="w-full max-w-md p-8 rounded-2xl bg-white/[0.02] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#00A651] text-black font-semibold rounded-xl hover:bg-[#00A651]/90 transition-colors"
          >
            Login
          </button>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-white/50">Manage career openings</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#00A651] text-black font-semibold rounded-xl hover:bg-[#00A651]/90 transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            Add Job
          </button>
        </div>

        {/* Job Form */}
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            className="mb-12 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h2 className="text-xl font-bold mb-6">
              {editingJob ? "Edit Job" : "New Job Posting"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none"
                required
              />
              <input
                type="text"
                placeholder="Department (e.g., Engineering)"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none"
                required
              />
              <input
                type="text"
                placeholder="Location (e.g., Remote, Okara)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <textarea
              placeholder="Job Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none mb-4 min-h-[120px]"
              required
            />
            <textarea
              placeholder="Requirements (one per line)"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00A651] outline-none mb-6 min-h-[100px]"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#00A651] text-black font-semibold rounded-xl hover:bg-[#00A651]/90 transition-colors"
              >
                {editingJob ? "Update Job" : "Post Job"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#00A651] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-xl">No jobs posted yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                className={`p-6 rounded-2xl border ${
                  job.isActive
                    ? "bg-white/[0.02] border-white/10"
                    : "bg-white/[0.01] border-white/5 opacity-50"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-white/50 text-sm">
                      {job.department} · {job.location} · {job.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => toggleActive(job._id, job.isActive)}
                      className={`p-2 rounded-lg transition-colors ${
                        job.isActive ? "bg-[#00A651]/20 text-[#00A651]" : "bg-white/5 text-white/30"
                      }`}
                      title={job.isActive ? "Hide" : "Show"}
                    >
                      {job.isActive ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import SeoMeta from "@layouts/SeoMeta";
import theme from "@config/theme.json"; // Use theme directly from theme.json

function Careers() {
    const [filter, setFilter] = useState("All");
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const jobListingsRef = useRef(null); // Reference for the job listings section

    const jobOpenings = [
        // { title: "Frontend Developer", location: "Remote", type: "Full-time", description: "Build and maintain user interfaces." },
        // { title: "Backend Developer", location: "Remote", type: "Full-time", description: "Develop and maintain server-side logic." },
        { title: "UI/UX Designer Intern (Un-paid)", location: "Remote", type: "Part-time", description: "Design user-friendly interfaces." },
    ];

    const filteredJobs = filter === "All" ? jobOpenings : jobOpenings.filter(job => job.type === filter);

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const scrollToJobListings = () => {
        jobListingsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <SeoMeta
                title="Careers at Nasmak Labs"
                description="Explore exciting career opportunities at Nasmak Labs and join our innovative team."
            />
            <section className="bg-gray-100 text-center py-10">
                <h1 className={`text-4xl font-bold ${theme.colors.default.text_color.dark}`}>Join Our Team</h1>
                <p className={`text-lg mt-4 ${theme.colors.default.text_color.default}`}>
                    {"Be part of a team that's shaping the future of software development."}
                </p>
            </section>

            <section className="py-6 text-center">
                <div className="inline-flex gap-4">
                    <button
                        className={`px-4 py-2 rounded ${filter === "All" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filter === "Full-time" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                        onClick={() => setFilter("Full-time")}
                    >
                        Full-time
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filter === "Part-time" ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                        onClick={() => setFilter("Part-time")}
                    >
                        Part-time
                    </button>
                </div>
            </section>

            <section ref={jobListingsRef} className="py-10">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job, index) => (
                        <div key={index} className="job-card p-6 shadow-md bg-white">
                            <h2 className={`text-2xl font-semibold ${theme.colors.default.text_color.dark}`}>{job.title}</h2>
                            <p className={`text-sm ${theme.colors.default.text_color.default}`}>Location: {job.location}</p>
                            <p className={`text-sm ${theme.colors.default.text_color.default}`}>Type: {job.type}</p>
                            <p className="mt-4">{job.description}</p>
                            <button
                                className="mt-4 px-4 py-2 rounded bg-green-500 text-white"
                                onClick={() => handleApplyClick(job)}
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-10 text-center bg-gray-100">
                <h2 className={`text-3xl font-bold ${theme.colors.default.text_color.dark}`}>Ready to Make an Impact?</h2>
                <p className={`mt-4 ${theme.colors.default.text_color.default}`}>
                    We’re always looking for talented individuals to join our team. Apply today!
                </p>
                {/* <button
                    className="mt-6 px-6 py-2 rounded bg-green-500 text-white"
                    onClick={scrollToJobListings}
                >
                    View All Openings
                </button> */}
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
                        <p className="mb-4">
                            To apply for this position, please send an email to{" "}
                            <a
                                href={`mailto:careers@nasmaklabs.com?subject=Application for ${selectedJob.title}`}
                                className="text-green-500 underline"
                            >
                                careers@nasmaklabs.com
                            </a>{" "}
                            with your resume and cover letter.
                        </p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-300"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Careers;
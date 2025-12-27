"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, MapPin, DollarSign } from "lucide-react";
import ApplyButton from "./ApplyButton";

export default function JobFeed() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Public endpoint for now, or authenticated
        axios.get("http://localhost:3001/jobs")
            .then(res => setJobs(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8 text-center">Loading jobs...</div>;

    return (
        <div className="space-y-4">
            {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                            <p className="text-slate-600 font-medium">{job.companyName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-medium">{job._count?.applications || 0} applicants</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                {job.status}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> ${job.salaryMin} - ${job.salaryMax}</span>
                    </div>

                    <p className="mt-4 text-slate-600 line-clamp-2">{job.description}</p>

                    <div className="mt-4 pt-4 border-t flex justify-end">
                        <ApplyButton jobId={job.id} />
                    </div>
                </div>
            ))}
            {jobs.length === 0 && (
                <div className="text-center p-8 text-slate-500">No jobs found. Check back later!</div>
            )}
        </div>
    );
}

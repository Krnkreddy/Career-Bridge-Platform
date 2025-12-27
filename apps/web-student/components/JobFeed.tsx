"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, MapPin, DollarSign } from "lucide-react";
import ApplyButton from "./ApplyButton";

export default function JobFeed() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchJobs = (query = "") => {
        setLoading(true);
        axios.get(`http://localhost:3001/jobs${query ? `?search=${query}` : ''}`)
            .then(res => setJobs(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs(search);
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, company..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition">
                    Search
                </button>
            </form>

            {loading && <div className="p-8 text-center">Loading jobs...</div>}

            {!loading && jobs.map(job => (
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

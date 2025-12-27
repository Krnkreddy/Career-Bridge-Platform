
"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PostJobPage() {
    const { getToken } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        location: "Remote",
        salaryMin: 0,
        salaryMax: 0,
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await getToken();
            await axios.post("http://localhost:3001/jobs",
                {
                    ...formData,
                    salaryMin: Number(formData.salaryMin),
                    salaryMax: Number(formData.salaryMax),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push("/");
        } catch (error) {
            console.error("Failed to post job", error);
            alert("Failed to post job. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="flex items-center text-slate-500 hover:text-slate-800 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                </Link>
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-blue-600 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
                        <p className="text-blue-100 mt-1">Find your next star employee.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                <input name="title" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Frontend Engineer" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                <input name="companyName" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Acme Corp" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                            <select name="location" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="On-site">On-site</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Min Salary ($)</label>
                                <input type="number" name="salaryMin" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Max Salary ($)</label>
                                <input type="number" name="salaryMax" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
                            <textarea name="description" required rows={6} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the role, responsibilities, and requirements..." />
                        </div>

                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex justify-center items-center">
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Publish Job"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

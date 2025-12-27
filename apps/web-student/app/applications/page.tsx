
"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Briefcase, Calendar } from "lucide-react";
import Link from 'next/link';

export default function ApplicationsPage() {
    const { getToken, userId } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const fetchApps = async () => {
            try {
                const token = await getToken();
                const res = await axios.get("http://localhost:3001/applications/student", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, [userId]);

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="text-slate-500 hover:text-slate-900">← Dashboard</Link>
                    <h1 className="text-2xl font-bold">Your Applications</h1>
                </div>

                <div className="space-y-4">
                    {applications.map(app => (
                        <div key={app.id} className="bg-white p-6 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{app.job.title}</h3>
                                    <p className="text-slate-600 font-medium">{app.job.companyName}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'APPLIED' ? 'bg-blue-100 text-blue-700' :
                                        app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                            'bg-green-100 text-green-700'
                                    }`}>
                                    {app.status}
                                </span>
                            </div>
                            <div className="mt-4 text-xs text-slate-400 flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                    {applications.length === 0 && (
                        <div className="text-center p-12 bg-white rounded-xl border">
                            <p className="text-slate-500">You haven't applied to any jobs yet.</p>
                            <Link href="/dashboard" className="text-blue-600 font-bold mt-2 inline-block">Find Jobs</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

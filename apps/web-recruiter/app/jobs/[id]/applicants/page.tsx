
"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ArrowLeft, Mail, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function JobApplicantsPage({ params }: { params: { id: string } }) {
    const { getToken } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApps = async () => {
        try {
            const token = await getToken();
            const res = await axios.get(`http://localhost:3001/applications/job/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, [params.id]);

    const updateStatus = async (appId: string, newStatus: string) => {
        try {
            const token = await getToken();
            await axios.patch(`http://localhost:3001/applications/${appId}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Optimistic update
            setApplications(apps => apps.map(app =>
                app.id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const router = useRouter();

    const handleMessage = async (studentId: string) => {
        try {
            const token = await getToken();
            const res = await axios.post("http://localhost:3001/chat/conversation",
                { recipientId: studentId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            router.push(`/messages?id=${res.data.id}`);
        } catch (err) {
            alert("Failed to start conversation");
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Link>
                    <Link href="/messages" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                        <Mail className="h-4 w-4" /> Go to Inbox
                    </Link>
                </div>
                <h1 className="text-2xl font-bold mb-6">Applicants for Job</h1>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600">Candidate</th>
                                <th className="p-4 font-semibold text-slate-600">Email</th>
                                <th className="p-4 font-semibold text-slate-600">Applied</th>
                                <th className="p-4 font-semibold text-slate-600">Status</th>
                                <th className="p-4 font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {applications.map(app => (
                                <tr key={app.id} className="hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-900">
                                        {app.student.profile?.fullName || "Anonymous"}
                                    </td>
                                    <td className="p-4 text-slate-600">{app.student.email}</td>
                                    <td className="p-4 text-slate-500 text-sm">{new Date(app.appliedAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${app.status === 'APPLIED' ? 'bg-blue-100 text-blue-700' :
                                            app.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center gap-4">
                                        <select
                                            value={app.status}
                                            onChange={(e) => updateStatus(app.id, e.target.value)}
                                            className="border rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="APPLIED">Applied</option>
                                            <option value="REVIEWING">Reviewing</option>
                                            <option value="INTERVIEW">Interview</option>
                                            <option value="OFFER">Offer</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>
                                        <button onClick={() => handleMessage(app.student.id)} className="text-slate-400 hover:text-blue-600 transition" title="Message Candidate">
                                            <Mail className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No applicants yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

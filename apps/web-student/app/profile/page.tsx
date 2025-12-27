
"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from 'next/link';

export default function ProfilePage() {
    const { getToken, userId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        bio: "",
        resumeUrl: "",
        skills: "" // Comma separated for MVP
    });

    useEffect(() => {
        if (!userId) return;
        const fetchProfile = async () => {
            try {
                const token = await getToken();
                const res = await axios.get("http://localhost:3001/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const profile = res.data?.profile || {};
                setFormData({
                    fullName: profile.fullName || "",
                    bio: profile.bio || "",
                    resumeUrl: profile.resumeUrl || "",
                    skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : ""
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = await getToken();
            // Convert comma separated skills to array
            const payload = {
                ...formData,
                skills: formData.skills.split(",").map(s => s.trim()).filter(s => s.length > 0)
            };

            await axios.patch("http://localhost:3001/users/me/profile", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/dashboard" className="flex items-center text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                            <textarea name="bio" rows={4} value={formData.bio} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell recruiters about yourself..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
                            <input name="skills" value={formData.skills} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="React, Node.js, Python" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Resume URL</label>
                            <input name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://linkedin.com/in/..." />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2">
                                {saving ? <Loader2 className="animate-spin h-4 w-4" /> : <><Save className="h-4 w-4" /> Save Profile</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

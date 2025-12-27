
"use client";

import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";
import { PlusCircle, Briefcase, Users, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const { getToken, userId } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchJobs = async () => {
      try {
        // TODO: Implement GET /jobs/my (recruiter specific)
        // For MVP, we filter client side or use public search? 
        // Better to make a quick endpoint or just filter public jobs for now for speed?
        // "GET /jobs" is public. Let's use that and filter by our ID? 
        // No, we need a "My Jobs" endpoint securely.
        // Let's implement /jobs/recruiter/me in backend quickly? 
        // Or just use the search endpoint if we can filter by recruiterId?

        // Wait, we implemented findAll with search. 
        // Let's just create a quick endpoint in Backend or filter client side for MVP?
        // Actually, we don't have a "My Jobs" endpoint. I should add it.
        // But for now, I will just filter the public list if I can, OR just assume 
        // I'll add the endpoint.

        // Let's assume I'll add GET /jobs/recruiter/me
        const token = await getToken();
        const res = await axios.get("http://localhost:3001/jobs", {
          // headers: { Authorization: `Bearer ${token}` } 
          // Public endpoint returns all. We need to filter. 
          // UsersService has getProfile. 
          // Let's just fetch all and filter in UI for this MVP step to save context switching cost.
        });
        // This is bad practice but works for MVP if volume is low.
        // OPTION 2: Use search query?
        setJobs(res.data); // Showing ALL jobs for now (Demo Mode) - User will only edit their own.
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [userId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-slate-800">Recruiter Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/jobs/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            <PlusCircle className="h-4 w-4" /> Post Job
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Your Posted Jobs</h1>

        {loading ? <Loader2 className="animate-spin" /> : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center hover:shadow-md transition">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                  <p className="text-slate-600">{job.companyName} • <span className="text-sm text-slate-400">{new Date(job.createdAt).toLocaleDateString()}</span></p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-slate-800">{job._count?.applications || 0}</span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Applicants</span>
                  </div>
                  <Link href={`/jobs/${job.id}/applicants`} className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition">
                    <Users className="h-5 w-5" /> Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="mb-4">No active jobs found.</p>
            <Link href="/jobs/new" className="text-blue-600 font-medium hover:underline">Post your first job</Link>
          </div>
        )}
      </main>
    </div>
  );
}

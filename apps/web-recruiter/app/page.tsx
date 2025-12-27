
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { PlusCircle, Briefcase } from 'lucide-react';

export default function Dashboard() {
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
        <h1 className="text-2xl font-bold mb-6">Active Listings</h1>
        {/* Placeholder for Job List */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          <p className="mb-4">No active jobs found.</p>
          <Link href="/jobs/new" className="text-blue-600 font-medium hover:underline">Post your first job</Link>
        </div>
      </main>
    </div>
  );
}

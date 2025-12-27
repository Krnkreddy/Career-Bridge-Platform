import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import JobFeed from "../../components/JobFeed";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
                <span className="font-bold text-xl text-slate-800">Dashboard</span>
                <UserButton afterSignOutUrl="/" />
            </nav>
            <main className="p-8">
                <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-slate-500 mb-2">Job Matches</h3>
                        <p className="text-3xl font-bold">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-slate-500 mb-2">Applications</h3>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                    <Link href="/profile" className="bg-white p-6 rounded-xl shadow-sm border block hover:border-blue-500 transition">
                        <h3 className="font-semibold text-slate-500 mb-2">Profile View</h3>
                        <p className="text-3xl font-bold">56</p>
                        <span className="text-sm text-blue-600 font-medium">Edit Profile →</span>
                    </Link>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Recommended Jobs</h2>
                    <JobFeed />
                </div>
            </main>
        </div>
    );
}

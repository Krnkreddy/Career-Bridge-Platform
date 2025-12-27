
import Link from 'next/link';
import { ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">CareerLink</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-slate-600 hover:text-slate-900 font-medium">Log in</Link>
            <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Your Bridge from <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Campus to Career</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Stop sending resumes into the void. Prove your skills, connect with real mentors, and get hired based on what you can actually do.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/sign-up" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-transform hover:scale-105">
            Join as Student <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="http://localhost:3001" className="flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-colors">
            I'm a Recruiter
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 text-left">
          <FeatureCard
            title="Verified Skills"
            desc="No more keyword stuffing. Pass assessments and get badges that recruiters trust."
          />
          <FeatureCard
            title=" Direct Mentorship"
            desc="Chat with alumni and seniors who are actually working in your dream roles."
          />
          <FeatureCard
            title="Project Portfolio"
            desc="Showcase your code, designs, and case studies in a format employers love."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <CheckCircle className="h-5 w-5 text-blue-600" />
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{desc}</p>
    </div>
  );
}

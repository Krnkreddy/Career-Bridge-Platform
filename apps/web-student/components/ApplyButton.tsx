
"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Loader2, CheckCircle } from "lucide-react";

export default function ApplyButton({ jobId }: { jobId: string }) {
    const { getToken, userId } = useAuth();
    const [status, setStatus] = useState<'idle' | 'loading' | 'applied' | 'error'>('idle');

    const handleApply = async () => {
        if (!userId) {
            alert("Please log in to apply");
            return;
        }
        setStatus('loading');
        try {
            const token = await getToken();
            await axios.post("http://localhost:3001/applications",
                { jobId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus('applied');
        } catch (error: any) {
            console.error(error);
            if (error.response?.status === 409) {
                setStatus('applied'); // Already applied
                alert("You have already applied to this job.");
            } else {
                setStatus('error');
                alert("Failed to apply. Please try again.");
            }
        }
    };

    if (status === 'applied') {
        return (
            <button disabled className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 cursor-default">
                <CheckCircle className="h-4 w-4" /> Applied
            </button>
        );
    }

    return (
        <button
            onClick={handleApply}
            disabled={status === 'loading'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
        >
            {status === 'loading' ? <Loader2 className="animate-spin h-4 w-4" /> : "Apply Now"}
        </button>
    );
}

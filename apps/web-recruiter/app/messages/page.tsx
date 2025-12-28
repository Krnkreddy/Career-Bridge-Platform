
import { Suspense } from "react";
import MessagesClient from "./MessagesClient";
import { Loader2 } from "lucide-react";

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <MessagesClient />
        </Suspense>
    );
}

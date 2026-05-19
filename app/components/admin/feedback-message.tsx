import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FeedbackMessageProps {
    type: "success" | "error";
    message: string;
}

export function FeedbackMessage({ type, message }: FeedbackMessageProps) {
    const isSuccess = type === "success";

    return (
        <div className={`mb-4 flex items-center justify-center gap-2 rounded-md border p-3 text-sm ${isSuccess ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
            {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message}</span>
        </div>
    );
}

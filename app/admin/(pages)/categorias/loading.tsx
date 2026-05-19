import { Loader } from "lucide-react";

export default function CategoriasLoading() {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin" size={30} />
        </div>
    );
}

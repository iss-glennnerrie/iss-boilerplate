import { Loader2 } from "lucide-react";


type LoadingFormDataProps = {
    description: string;
};

export default function LoadingFormData({ description }: LoadingFormDataProps) {
    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-sm text-muted-foreground">{description}</p>
        </div>
    );
}

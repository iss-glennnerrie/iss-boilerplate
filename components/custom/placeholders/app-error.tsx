"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppErrorProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export function AppError({
    title = "Something went wrong",
    message = "An error occurred while loading the data. Please try again.",
    onRetry,
}: AppErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-100 p-6 text-center">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
            {onRetry && (
                <Button variant="outline" onClick={onRetry}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try again
                </Button>
            )}
        </div>
    );
}

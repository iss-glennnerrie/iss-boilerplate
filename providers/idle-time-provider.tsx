
"use client";

import { IdleTimerProvider } from "react-idle-timer";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";
import { RemoveToken } from "@/services/handlers/token-handler";
import { useLockStore } from "@/hooks/layout/use-lock";

const IDLE_TIMEOUT = 1000 * 60 * 60 * 4; // 4 hours
const LOCK_KEY = "app-locked";
const LAST_PATH_KEY = "last-path";

export default function IdleProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const lock = useLockStore((state) => state.lock);
    const unlock = useLockStore((state) => state.unlock);

    const unprotectedPaths = ["/login", "/register", "/lockscreen"];

    const isProtectedRoute = !unprotectedPaths.includes(pathname);

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            RemoveToken();
            router.push("/lockscreen");
        },
        onError: () => {
            RemoveToken();
            router.push("/lockscreen");
        },
    });
    const handleOnIdle = () => {
        if (!isProtectedRoute) return;

        localStorage.setItem(LOCK_KEY, "true");
        localStorage.setItem(LAST_PATH_KEY, pathname);
        lock();
        logoutMutation.mutate();
    };
    const updateLastActive = () => {
        localStorage.setItem("lastActiveTime", Date.now().toString());
    };

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === LOCK_KEY) {
                if (event.newValue === "true") {
                    lock();
                    if (isProtectedRoute) {
                        logoutMutation.mutate();
                    }
                } else {
                    unlock();
                }
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [lock, unlock, router, isProtectedRoute]);

    useEffect(() => {
        const lastActiveStr = localStorage.getItem("lastActiveTime");
        if (!lastActiveStr) return; // <-- nothing to compare, skip

        const lastActive = parseInt(lastActiveStr, 10);
        const now = Date.now();
        const isTimedOut = now - lastActive > IDLE_TIMEOUT;

        if (isTimedOut && isProtectedRoute) {
            localStorage.setItem(LOCK_KEY, "true");
            localStorage.setItem(LAST_PATH_KEY, pathname);
            lock();
            logoutMutation.mutate();
        }
    }, []);

    return (
        <IdleTimerProvider timeout={IDLE_TIMEOUT} onIdle={handleOnIdle} onAction={updateLastActive} debounce={500} disabled={!isProtectedRoute}>
            {children}
        </IdleTimerProvider>
    );
}

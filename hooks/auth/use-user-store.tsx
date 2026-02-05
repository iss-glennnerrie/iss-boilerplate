
import { appNameToSlug } from '@/lib/utils';
import { User } from '@/types/user';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';



interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const appName = appNameToSlug(process.env.NEXT_PUBLIC_APP_NAME)+'-user'
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => {
                set({ user: null })
                localStorage.removeItem(appName)
            },
        }),
        {
            name: appName,
            storage: createJSONStorage(() => localStorage)
        },
    )
);
export default useUserStore;
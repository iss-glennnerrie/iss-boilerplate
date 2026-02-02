import { create } from "zustand";

type TitleState = {
    title: string | null;
    setTitle: (title: string | null) => void;
};

const useTitle = create<TitleState>((set) => {
    const store = {
        title: null,
        setTitle: (title: string | null) => set({ title }),
    };
    return store;
});

useTitle.subscribe((state) => {
    if (typeof document !== "undefined") {
        document.title = state.title ? process.env.NEXT_PUBLIC_APP_NAME + state.title : "";
    }
});

export default useTitle;

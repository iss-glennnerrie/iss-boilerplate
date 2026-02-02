import { create } from "zustand";


interface DatatableState {
    keyword: string;
    paginate: number;
    page: number;
}

interface StoreState {
    tables: Record<string, DatatableState>;
    setKeyword: (tableId: string, keyword: string) => void;
    setPaginate: (tableId: string, paginate: number) => void;
    setPage: (tableId: string, page: number) => void;
    reset: (tableId: string) => void;
}

export const useDatatableStore = create<StoreState>((set) => ({
    tables: {},
    setKeyword: (tableId, keyword) =>
        set((state) => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    keyword,
                },
            },
        })),
    setPaginate: (tableId, paginate) =>
        set((state) => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    paginate,
                },
            },
        })),
    setPage: (tableId, page) =>
        set((state) => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    ...state.tables[tableId],
                    page,
                },
            },
        })),
    reset: (tableId) =>
        set((state) => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    keyword: "",
                    paginate: 10,
                    page: 1,
                    assetTypeId: "",
                },
            },
        })),
}));

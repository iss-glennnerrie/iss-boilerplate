"use client";

import { useEffect } from "react";
import { useDatatableStore } from "./use-datatable-store";

const useDatatableSet = (tableId: string) => {
    const { tables, setKeyword, setPaginate, setPage } = useDatatableStore();

    useEffect(() => {
        if (!tables[tableId]) {
            useDatatableStore.setState((state) => ({
                tables: {
                    ...state.tables,
                    [tableId]: {
                        keyword: "",
                        paginate: 10,
                        page: 1,
                    },
                },
            }));
        }
    }, [tableId, tables]);

    return {
        keyword: tables[tableId]?.keyword || "",
        paginate: tables[tableId]?.paginate || 10,
        page: tables[tableId]?.page || 1,
        setKeyword: (keyword: string) => setKeyword(tableId, keyword),
        setPaginate: (paginate: number) => setPaginate(tableId, paginate),
        setPage: (page: number) => setPage(tableId, page),
    };
};

export default useDatatableSet;

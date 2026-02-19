"use client";

import { ColumnDef } from "@tanstack/react-table";


import { Supplier } from "@/types/supplier";
import { FolderClosed } from "lucide-react";
import Link from "next/link";

export const supplierColumns: ColumnDef<Supplier>[] = [
    {
        accessorKey: "Company",
        header: "Company",
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="flex font-bold hover:text-primary dark:hover:text-blue-400">
                    <FolderClosed className="h-5 w-5 me-2" />
                    <Link href={`/settings/suppliers/${data.id}`}>{data.company}</Link>
                </div>
            );
        },
    },
    {
        accessorKey: "contact_person",
        header: "Contact Person",
    },
    {
        accessorKey: "contact_number",
        header: "Contact Number",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    
];

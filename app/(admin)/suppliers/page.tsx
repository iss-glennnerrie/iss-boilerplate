"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useDatatableSet from "@/hooks/layout/use-datatable-set";
import { supplierApi } from "@/api/supplierApi";
import AppContent from "@/components/custom/app-content";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Datatable from "@/components/custom/datatable/datatable";
import AppModal from "@/components/custom/modal/app-modal";
import useSupplier from "@/hooks/supplier/use-supplier";
import { supplierColumns } from "./supplier-column";
import SupplierForm from "./supplier-form";
import { AppError } from "@/components/custom/placeholders/app-error";

export default function DesignationPage() {
    const { setOpenModal, openModal, formMode, setFormMode } = useSupplier();

    const query = { ...useDatatableSet("dt_suppliers") };
    const { data: suppliers, isLoading, isError } = useQuery({
        queryKey: ["suppliers", query],
        queryFn: async () => {
            const response = await supplierApi.get(query);
            return response.data.data;
        },
    });

    // if (isError) {
    //     return <AppError/>
    // }

    return (
        <AppContent title="Supplier Management">
            <Card>
                <CardHeader>
                    <div className="flex">
                        <div>
                            <CardTitle>Suppliers</CardTitle>
                            <CardDescription>Masterlist of suppliers</CardDescription>
                        </div>
                        <div className="ml-auto">
                            <Button
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    setOpenModal(true);
                                    setFormMode("create");
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" /> <span>Add </span> <span className="xl:block hidden">Supplier</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Datatable data={suppliers} columns={supplierColumns} tableId="dt_suppliers" isLoading={isLoading} isError={isError} />
                </CardContent>
            </Card>
            <AppModal
                title={formMode == "create" ? "New Supplier" : "Update Supplier"}
                description="Supplier Form"
                open={openModal}
                setOpen={setOpenModal}
            >
                <SupplierForm />
            </AppModal>
        </AppContent>
    );
}

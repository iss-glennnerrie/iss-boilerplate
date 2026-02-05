import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { AxiosError } from "axios";
import useSupplier from "@/hooks/supplier/use-supplier";
import { supplierDefaultValues, supplierSchema } from "@/schemas/supplier-schema";
import { useFormErrorHandler } from "@/services/handlers/use-form-handler";
import { supplierApi } from "@/api/supplierApi";
import SubmitButton from "@/components/custom/submit-button";

import LoadingFormData from "@/components/custom/placeholders/loading-form-data";
import { Input } from "@/components/ui/input";

const SupplierForm = () => {
    const queryClient = useQueryClient();
    const { formMode, supplierId, setOpenModal } = useSupplier();
    const form = useForm<z.infer<typeof supplierSchema>>({
        resolver: zodResolver(supplierSchema),
        defaultValues: supplierDefaultValues,
    });
    const handleError = useFormErrorHandler<z.infer<typeof supplierSchema>>();

    const { data: supplier, isPending } = useQuery({
        queryKey: ["supplier", supplierId],
        queryFn: async () => {
            const response = await supplierApi.getById(supplierId);
            return response.data.data;
        },
        enabled: !!supplierId,
    });

    useEffect(() => {
        if (formMode == "edit" && supplier) {
            form.reset({
                id: supplier.id,
                contact_number: supplier.contact_number,
                contact_person: supplier.contact_person,
                email: supplier.email,
                is_active: supplier.is_active.toString(),
            });
        }
    }, [supplier, supplierId, formMode, form]);

    const mutation = useMutation({
        mutationFn:
            formMode == "create"
                ? (request: z.infer<typeof supplierSchema>) => supplierApi.store(request)
                : (request: z.infer<typeof supplierSchema>) => supplierApi.update(supplierId, request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"],
            });
            toast.success(data.data.message, { duration: 5000 });
            setOpenModal(false);
        },
        onError: (error: AxiosError) => {
            handleError(error, form);
        },
    });

    const onSubmit = (values: z.infer<typeof supplierSchema>) => {
        console.log(values);
        mutation.mutateAsync(values);
    };

    if (formMode == "edit" && isPending) {
        return <LoadingFormData description="Loading data..." />;
    }

    return (
        <div className="flex flex-col space-y-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="Company ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact_person"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Person</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="Contact Person ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="Contact Number ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="Email ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="Address ..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="pt-2 w-full flex">
                        <SubmitButton isPending={mutation.isPending} />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SupplierForm;

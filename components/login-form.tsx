"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authSchema } from "@/schemas/auth-schema";
import { authApi } from "@/api/authApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useFormError } from "@/hooks/layout/use-form-error";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Spinner } from "./ui/spinner";
import { Save } from "lucide-react";
import { FieldDescription } from "./ui/field";
export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const queryClient = useQueryClient();
    const handleError = useFormError<z.infer<typeof authSchema>>();
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const mutation = useMutation({
        mutationFn: (request: z.infer<typeof authSchema>) => authApi.login(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["designations"],
            });
            toast.success(data.data.message, { duration: 5000 });
        },
        onError: (error: AxiosError) => {
            handleError(error, form);
        },
    });
     const onSubmit = (values: z.infer<typeof authSchema>) => {
        console.log(values)
        mutation.mutateAsync(values)

    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Email and Password</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormMessage />
                                        <FormControl>
                                            <Input placeholder="Email Name ..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormMessage />
                                        <FormControl>
                                            <Input placeholder="Password ..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-2 w-full flex">
                                <Button
                                    className="w-[150px] ml-auto transition-all duration-200 hover:shadow-md"
                                    type="submit"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending ? (
                                        <>
                                           <Spinner/> Saving ...
                                        </>
                                    ) : (
                                        <>
                                            <Save /> Save
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}

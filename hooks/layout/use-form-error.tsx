import { AxiosError } from "axios";
import { UseFormReturn, Path, FieldValues } from "react-hook-form";
import { toast } from "sonner";

type ErrorResponse = {
    errors?: Record<string, string[]>;
    message?: string;
};

export function useFormError<T extends FieldValues>() {
    return (error: AxiosError | null, form?: UseFormReturn<T>) => {
        if (error) {
            const responseData = error?.response?.data as ErrorResponse | undefined;

            // if `errors` is a string instead of an object
            if (typeof responseData?.errors === "string") {
                toast.error(responseData.errors, { duration: 10000 });
                return;
            }

            // if object errors
            if (responseData?.errors && typeof responseData.errors === "object" && form) {
                const errorMessages: string[] = [];

                Object.keys(responseData.errors).forEach((field) => {
                    const messages = Array.isArray(responseData.errors?.[field])
                        ? responseData.errors[field]
                        : [responseData.errors?.[field] ?? "Unknown error"];

                    form.setError(field as Path<T>, {
                        type: "server",
                        message: messages.join(" "),
                    });

                    errorMessages.push(...messages);
                });

                if (errorMessages.length > 0) {
                    toast.error(errorMessages.join("\n"), { duration: 10000 });
                }
            } else {
                toast.error(responseData?.message ?? error.message ?? "An unexpected error occurred.", {
                    duration: 10000,
                });
            }
        }
    };
}

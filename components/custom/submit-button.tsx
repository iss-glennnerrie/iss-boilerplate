import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Save } from "lucide-react";

interface SubmitButtonProps {
    label?: string;
    loadingLabel?: string;
    isPending: boolean;
}

const SubmitButton = ( {
    loadingLabel = 'Saving ...',
    label = 'Save',
    isPending
} : SubmitButtonProps) => {
    return (
        <Button className="ml-auto transition-all duration-200 hover:shadow-md" type="submit" disabled={isPending}>
            {isPending ? (
                <>
                    <Spinner/> {loadingLabel}
                </>
            ) : (
                <>
                    <Save /> {label}
                </>
            )}
        </Button>
    );
};

export default SubmitButton;

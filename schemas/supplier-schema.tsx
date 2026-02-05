import z from "zod";

export const supplierSchema = z.object({
    uid: z.string().optional(),
    id: z.string().optional(),
    company: z.string().nonempty("Company is required"),
    address: z.string().nonempty("Address is required"),
    email: z.string().nonempty("Email is required"),
    contact_number: z.string().nonempty("Contact Number is required"),
    contact_person: z.string().nonempty("Contact Person is required"),
    is_active: z.string().optional(),
})


export const supplierDefaultValues = {
    address : '', 
    email : '', 
    company : '',
    contact_person : '',
    contact_number : '',
    is_active : '',
    id : '',
    uid : '',
    
}
import { create } from "zustand";

type SupplierState = {
    supplierId: string | null;
    openModal: boolean;
    formMode: 'create' | 'edit',
    setFormMode: (formMode: 'create' | 'edit') => void,
    setsupplierId: (supplierId: string | null) => void;
    setOpenModal: (open: boolean) => void;
};

const useSupplier = create<SupplierState>((set) => ({
    supplierId: null,
    openModal: false,
    formMode: 'create',
    setFormMode: (formMode) => set({ formMode }),
    setsupplierId: (supplierId) => set({ supplierId }),
    setOpenModal: (openModal) => set({ openModal }),

}));

export default useSupplier;
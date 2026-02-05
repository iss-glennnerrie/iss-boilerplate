import Axi from "@/services/interceptors/Axi";

export const supplierApi = {
    get: async (data: any) => {
        const response = await Axi.get(`/suppliers?paginate=${data.paginate}&page=${data.page}&keyword=${data.keyword}`);
        return response;
    },
    list: async () => {
        const response = await Axi.get(`/suppliers/list`);
        return response;
    },
    getById: async (id: any) => {
        const response = await Axi.get(`/suppliers/${id}`);
        return response;
    },
    update: async (id: any, data: any) => {
        const response = await Axi.put(`/suppliers/${id}`, data);
        return response;
    },
    store: async (data : any) => {
        const response = await Axi.post('/suppliers', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },
    delete: async (id: any) => {
        const response = await Axi.delete(`/suppliers/${id}`);
        return response;
    },
}
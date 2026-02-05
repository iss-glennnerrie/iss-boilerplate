import Axi from "@/services/interceptors/Axi";

export const authApi = {
    login: async (data: any) => {
        const response = await Axi.post(`/login`, data);
        return response;
    },
    logout: async () => {
        const response = await Axi.post(`/logout`);
        return response;
    },
};

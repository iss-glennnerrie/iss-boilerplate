import Axi from "@/services/interceptors/Axi";

export const authApi = {
    login: async (data: any) => {
        const response = await Axi.post(`/auth/login`, data);
        return response;
    }
};

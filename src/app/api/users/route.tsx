import axiosInstance from "@/app/lib/api";

export async function getUsers(queryParams: any = {}) {
    return await axiosInstance.get('/user', {
        params: queryParams,
    });
}

export async function getUserById(id: string) {
    return await axiosInstance.get(`/user/${id}`);
}

export async function createUser(payload: any) {
    return await axiosInstance.post('/user', payload)
}

export async function updateUser(id: string, payload: any) {
    return await axiosInstance.put(`/user/${id}`, payload)
}

export async function deleteUser(id: string) {
    return await axiosInstance.delete(`/user/${id}`)
}

import { login, register } from "./apiroute/loginRoutes";
import axiosInstance from "../config";


export const loginAPI = async (data) => {

    const response = await axiosInstance.post(login, {
        email: data.email,
        password: data.password
    });
    return response.data;

}
export const registerAPI = async (data) => {
    const response = await axiosInstance.post(register, {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password
    });
    return response.data;

}
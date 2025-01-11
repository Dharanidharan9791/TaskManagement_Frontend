import { getAllLeads } from "./apiRoute/leadRoute";
import axiosInstance from "../config";
export const getAllLeadsAPI = async () => {
  try {
    const response = await axiosInstance.get(getAllLeads);
    return response.data;
  } catch (error) {
    throw error;
  }
}
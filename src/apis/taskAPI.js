import { getAllTasks } from "./apiRoute/taskRoute";
import axiosInstance from "../config";
import { addTask,deleteTask,updateTask } from "./apiRoute/taskRoute";

export const getAllTasksAPI = async (lead_id) => {
    try {
        const response = await axiosInstance.get(getAllTasks + lead_id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addTaskAPI = async (companyId, taskData) => {
    try {
        const response = await axiosInstance.post(addTask, {
            // Request body
            assigned_user: taskData.assigned_user,
            task_date: taskData.task_date,
            task_time: taskData.task_time,
            is_completed: taskData.is_completed,
            time_zone: taskData.time_zone,
            task_msg: taskData.task_msg,
          },
          {
            // Query parameters
            params: { company_id: companyId },
          });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateTaskAPI = async (companyId, taskId, taskData) => {
    try {
        const response = await axiosInstance.put(updateTask +companyId+"/"+ taskId, {
            assigned_user: taskData.assigned_user,
            task_date: taskData.task_date,
            task_time: taskData.task_time,
            is_completed: taskData.is_completed,
            time_zone: taskData.time_zone,
            task_msg: taskData.task_msg,
          });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteTaskAPI = async (companyId, taskId) => {
    try {
        const response = await axiosInstance.delete(deleteTask + companyId+"/"+ taskId);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
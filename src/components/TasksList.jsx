// src/components/TasksList.jsx
import React, { useState, useEffect } from "react";
import AddTaskModal from "./AddTaskModal";
import { getAllTasksAPI, deleteTaskAPI } from "../apis/taskAPI";
import '../style/tasks.css';

const TasksList = ({ leadId, leadName }) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [leadId]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasks = await getAllTasksAPI(leadId);
      setTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    await fetchTasks();
    setLoading(false);
  };

  const handleEditTask = async () => {
    setLoading(true);
    await fetchTasks();
    setLoading(false);
  };

  const handleDeleteTask = async (task) => {
    setLoading(true);
    try {
      await deleteTaskAPI(task.lead_id, task._id);
      setTasks(tasks.filter(t => t._id !== task._id));
    } catch (error) {
      console.error("Failed to delete task", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="tasks-container">
      <h2>Tasks for {leadName}</h2>
      <button className="add-task-button" onClick={() => setShowModal(true)}>Add Task</button>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              {task.task_msg}
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <AddTaskModal
          leadId={leadId}
          task={editingTask}
          onClose={handleModalClose}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default TasksList;

import React, { useState, useEffect } from "react";
import { addTaskAPI, updateTaskAPI } from "../apis/taskAPI";

const AddTaskModal = ({ leadId, task, onClose, onAddTask, onEditTask }) => {
  const [taskMsg, setTaskMsg] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [isCompleted, setIsCompleted] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskMsg(task.task_msg);
      setAssignedUser(task.assigned_user);
      setTaskDate(task.task_date);
      setTaskTime(new Date(task.task_time * 1000).toISOString().substr(11, 5));
      setIsCompleted(task.is_completed);
    } else {
      setTaskMsg("");
      setAssignedUser("");
      setTaskDate("");
      setTaskTime("");
      setIsCompleted(0);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const [hours, minutes] = taskTime.split(":").map(Number);
    const timeInSeconds = hours * 3600 + minutes * 60;
    const timeZoneOffset = new Date().getTimezoneOffset() * -60;

    const taskData = {
      assigned_user: assignedUser,
      task_date: taskDate,
      task_time: timeInSeconds,
      is_completed: parseInt(isCompleted, 10),
      time_zone: timeZoneOffset,
      task_msg: taskMsg,
    };

    try {
      if (task) {
        const response = await updateTaskAPI(leadId, task._id, taskData);
        onEditTask(response);
      } else {
        const response = await addTaskAPI(leadId, taskData);
        onAddTask(response);
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit task", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{task ? "Edit Task" : "Add Task"}</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Description</label>
            <textarea
              value={taskMsg}
              onChange={(e) => setTaskMsg(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Assigned User</label>
            <input
              type="text"
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              placeholder="Enter user ID"
              required
            />
          </div>
          <div>
            <label>Task Date</label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Task Time</label>
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Is Completed</label>
            <select
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value)}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : task ? "Save Changes" : "Add Task"}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

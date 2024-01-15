import React from "react";
import api from "../axiosConfig";
import { Routes, Route, Link } from "react-router-dom";

const WorkoutItem = ({ workout, onDelete, trainingProgramId }) => {
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/workouts/${trainingProgramId}/${workout._id}`
      );
      if (response.status === 200) {
        onDelete(workout._id);
        console.log("Workout deleted successfully!");
      } else {
        console.error("Error deleting training program:", response);
      }
    } catch (error) {
      console.error("Error deleting training program:", error);
    }
  };
  return (
    <>
      <Link to={`workout/${workout._id}?type=${workout.type}`}>
        <div>
          <Routes>
            <Route path="" />
          </Routes>
          <h3>{workout.name}</h3>
        </div>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default WorkoutItem;

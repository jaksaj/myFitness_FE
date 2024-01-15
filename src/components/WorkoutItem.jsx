import React from "react";
import api from "../axiosConfig";
import { Link } from "react-router-dom";
import "./WorkoutItem.css";

const WorkoutItem = ({ workout, onDelete, trainingProgramId }) => {
  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/workouts/${trainingProgramId}/${workout._id}`
      );
      if (response.status === 200) {
        onDelete(workout._id);
      } else {
        console.error("Error deleting training program:", response);
      }
    } catch (error) {
      console.error("Error deleting training program:", error);
    }
  };
  return (
    <div className="workoutItem">
      <Link
        to={`workout/${workout._id}?type=${workout.type}`}
        className="linkNoColor"
      >
        <div>
          <h2>{workout.name}</h2>
          <p>Type: {workout.type}</p>
        </div>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default WorkoutItem;

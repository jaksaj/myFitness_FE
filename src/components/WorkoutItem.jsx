import React from "react";
import styles from "./TrainingProgramItem.module.css";
import AddWorkout from "./AddWorkout";
import api from "../axiosConfig";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const WorkoutItem = ( workout, onDelete ) => {
  
  return (
    <Link to={`workout/${workout.program._id}`}>
      <div>
          <Routes>
            <Route path="" />
          </Routes>
          <h3>{workout.program.name}</h3>
      </div>
    </Link>
  );
};

export default WorkoutItem;

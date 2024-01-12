import React from "react";
import styles from "./TrainingProgramItem.module.css";
import AddWorkout from "./AddWorkout";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const WorkoutItem = ({ workout }) => {
  
  return (
    <Link to={"/exercise"}>
      <div>
          <Routes>
            <Route path="" />
          </Routes>
          <h3>{workout.name}</h3>
      </div>
    </Link>
  );
};

export default WorkoutItem;

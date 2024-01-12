import React from "react";
import styles from "./TrainingProgramItem.module.css";
import Workout from "./Workout";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const TrainingProgramItem = ({ program }) => {
  return (
    <Link to="/workout">
      <div className={styles.programItem}>
        <Routes>
          <Route path="/workout" Component={Workout} />
        </Routes>
        <h3>{program.name}</h3>
        <p>Type: {program.type}</p>
      </div>
    </Link>
  );
};

export default TrainingProgramItem;

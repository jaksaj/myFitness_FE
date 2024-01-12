import React from "react";
import styles from "./TrainingProgramItem.module.css";
import { Link } from "react-router-dom";

const TrainingProgramItem = ({ program }) => {
  return (
    <div className={styles.programItem}>
      <Link to={`trainingProgram/${program._id}`}>
        <h3>{program.name}</h3>
        <p>Type: {program.type}</p>
      </Link>
    </div>
  );
};

export default TrainingProgramItem;

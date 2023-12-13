import React from "react";
import styles from "./TrainingProgramItem.module.css";

const TrainingProgramItem = ({ program }) => {
  return (
    <a href="#">
      <div className={styles.programItem}>
        <h3>{program.name}</h3>
        <p>Type: {program.type}</p>
      </div>
    </a>
  );
};

export default TrainingProgramItem;

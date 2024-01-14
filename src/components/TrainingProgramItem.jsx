import React from "react";
import styles from "./TrainingProgramItem.module.css";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
const TrainingProgramItem = ({ program, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/trainingPrograms/${program._id}`);
      if (response.status === 200) {
        onDelete(program._id);
      } else {
        console.error("Error deleting training program:", response);
      }
    } catch (error) {
      console.error("Error deleting training program:", error);
    }
  };
  return (
    <div className={styles.programItem}>
      <Link to={`trainingProgram/${program._id}?type=${program.type}`}>
        <h3>{program.name}</h3>
        <p>Type: {program.type}</p>
      </Link>
      <button onClick={handleDelete}>
          Delete
      </button>
    </div>
  );
};

export default TrainingProgramItem;

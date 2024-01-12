import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";
import Exercise from "./AddExercise";
import WorkoutItem from "./WorkoutItem"; 
import HomePage from "./HomePage";
function AddWorkout(params) {
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState("");
  
  const handleWorkoutChange = (e) => {
    const inputValue = e.target.value;
    setSelectedWorkout(inputValue);
  };

  const testToken = async () => {
    try {
      const response = await api.post("/workouts", {
        name: selectedWorkout
      });
      console.log(response);
      
    } catch (error) {
      console.error("Error!", error);
    }
  };

  return (
    
    <div className="box">
      <h2 id="title">Add workout</h2>
      <div id="SplitChoice">
        <label className="label">Select a workout:</label>
        <select
          onChange={handleWorkoutChange}
          value={selectedWorkout}
          className="select"
        >
          <option value="Push">Push</option>
          <option value="Pull">Pull</option>
          <option value="Legs">Legs</option>
        </select>
      </div>

      

      <button type="button" onClick={testToken} className="button">
        ADD
      </button>

      <button type="button" onClick = {() => navigate("/workout")}className="button" id="upper">
        BACK
      </button>

      <button type="button" onClick = {() => navigate("/home")}className="button" id="upper">
        HOMEPAGE
      </button>
    </div>
  );
}


export default AddWorkout;

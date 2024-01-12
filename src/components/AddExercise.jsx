import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";
import Exercise from "./Exercise";
import WorkoutItem from "./WorkoutItem"; 
import HomePage from "./HomePage";
function AddExercise(params) {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState("");
  const [numberOfReps, setNumberOfReps] = useState("");
  const [weightNumber, setWeightNumber] = useState("");
  const handleExerciseChange = (e) => {
    const inputValue = e.target.value;
    setSelectedExercise(inputValue);
  };
  const [numberOfSets, setNumberOfSets] = useState(1);

  const handleNumberOfSetsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setNumberOfSets(newValue);
  };
  const handleWeightNumberChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setWeightNumber(newValue);
  };
  const handleNumberOfRepsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setNumberOfReps(newValue);
  };
  const testToken = async () => {
    try {
      const response = await api.post("/exercises", {
        name: selectedExercise,
        sets: numberOfSets,
        reps: numberOfReps,
        weight: weightNumber
      });
      console.log(response);
      navigate("/exercise")
    } catch (error) {
      console.error("Error!", error);
    }
  };

  return (
    
    <div className="box">
      <h2 id="title">Add Exercise</h2>
      <div id="SplitChoice">
        <label className="label">Select a exercise:</label>
        <select
          onChange={handleExerciseChange}
          value={selectedExercise}
          className="select"
        >
          <option value="Push">Push</option>
          <option value="Pull">Pull</option>
          <option value="Legs">Legs</option>
        </select>
        <label className="label">Select a number of sets:</label>
        <input id="number" type="number" value={numberOfSets} onChange={handleNumberOfSetsChange}/>
      

        <label className="label">Select a number of reps:</label>
        <input id="number" type="number" value={numberOfReps} onChange={handleNumberOfRepsChange}/>

        <label className="label">Select a weight per every rep:</label>
        <input id="number" type="number" value={weightNumber} onChange={handleWeightNumberChange}/>

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


export default AddExercise;

import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";
import Workout from "./Workout";
import WorkoutItem from "./WorkoutItem"; 
import HomePage from "./HomePage";
function AddExercise(params) {
  const {workoutId}=useParams();
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState("Bench");
  const [reps, setReps] = useState("");
  // const [weightNumber, setWeightNumber] = useState("");
  const handleExerciseChange = (e) => {
    const inputValue = e.target.value;
    setSelectedExercise(inputValue);
  };
  const [sets, setSets] = useState(1);

  const handleNumberOfSetsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSets(newValue);
  };
  // const handleWeightNumberChange = (e) => {
  //   const newValue = parseInt(e.target.value, 10);
  //   setWeightNumber(newValue);
  // };
  const handleNumberOfRepsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setReps(newValue);
  };
  const testToken = async () => {
    try {
      const response = await api.post(`/exercises`, {
        workoutId,
        exerciseDetails:{
          name: selectedExercise,
          sets,
          reps,
        // weight: weightNumber
        }
      });
      console.log(response);
      navigate(-1);
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
          <option value="Bench">Bench</option>
          <option value="Squat">Squat</option>
          <option value="Deadlift">Deadlift</option>
        </select>
        <label className="label">Select a number of sets:</label>
        <input id="number" type="number" value={sets} onChange={handleNumberOfSetsChange}/>
      

        <label className="label">Select a number of reps:</label>
        <input id="number" type="number" value={reps} onChange={handleNumberOfRepsChange}/>

        {/* <label className="label">Select a weight per every rep:</label>
        <input id="number" type="number" value={weightNumber} onChange={handleWeightNumberChange}/> */}

      </div>

      

      <button type="button" onClick={testToken} className="button">
        ADD
      </button>

      <button type="button" onClick = {() => navigate(-1)}className="button" id="upper">
        BACK
      </button>

      <button type="button" onClick = {() => navigate("/home")}className="button" id="upper">
        HOMEPAGE
      </button>
    </div>
  );
}


export default AddExercise;

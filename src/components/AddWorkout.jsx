import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";
import Exercise from "./AddExercise";
import WorkoutItem from "./WorkoutItem";
import HomePage from "./HomePage";
function AddWorkout() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const { programId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const availableWorkoutTypes = (() => {
    switch (type) {
      case "PPL":
        return ["PUSH", "PULL", "LEGS"];
      case "Upper_lower":
        return ["UPPER", "LOWER"];
      case "Full_body":
        return ["Full_body"];
      default:
        return [];
    }
  })();
  
  const handleWorkoutChange = (e) => {
    const inputValue = e.target.value;
    setSelectedWorkout(inputValue);
  };
  const handleWorkoutNameChange = (e) => {
    const inputValue = e.target.value;
    setWorkoutName(inputValue);
  };

  const addWorkoutToTrainingProgram = async () => {
    try {
      const trainingProgramId = programId;
      if (selectedWorkout.length<1) {
        setSelectedWorkout(()=>availableWorkoutTypes[0]);
      }

      const response = await api.post("/workouts", {
        trainingProgramId,
        workoutDetails: { name: workoutName, type: selectedWorkout },
      });
      navigate(-1);
    } catch (error) {
      console.error("Error!", error);
    }
  };

  return (
    <div className="box">
      <h2 id="title">Add workout</h2>
      <div>
        <label className="label">Training program name</label>
        <input
          type="text"
          value={workoutName}
          onChange={handleWorkoutNameChange}
          placeholder="Enter training name"
          className="entrance"
        />
      </div>
      <div id="SplitChoice">
        <label className="label">Select a workout:</label>
        <select
          onChange={handleWorkoutChange}
          value={selectedWorkout}
          className="select"
        >
          {availableWorkoutTypes.map((workoutType) => (
            <option key={workoutType} value={workoutType}>
              {workoutType}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={addWorkoutToTrainingProgram}
        className="button"
      >
        ADD
      </button>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="button"
        id="upper"
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => navigate("/home")}
        className="button"
        id="upper"
      >
        HOMEPAGE
      </button>
    </div>
  );
}

export default AddWorkout;

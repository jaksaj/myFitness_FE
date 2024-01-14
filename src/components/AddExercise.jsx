import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";
import Workout from "./Workout";
import WorkoutItem from "./WorkoutItem";
import HomePage from "./HomePage";
function AddExercise() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [selectedExercise, setSelectedExercise] = useState("Bench");
  const [reps, setReps] = useState(1);
  const handleExerciseChange = (e) => {
    const inputValue = e.target.value;
    setSelectedExercise(inputValue);
  };
  const [sets, setSets] = useState(1);
  const availableExercise = (() => {
    switch (type) {
      case "PUSH":
        return ["Bench Press", "Overhead Press", "Tricep Dips"];
      case "PULL":
        return ["Deadlifts", "Pull-ups", "Barbell Rows"];
      case "LEGS":
        return ["Squats", "Lunges", "Leg Press"];
      case "UPPER":
        return ["Bicep Curls", "Shoulder Press", "Lat Pulldowns"];
      case "LOWER":
        return ["Leg Curls", "Calf Raises", "Hammer Strength Leg Press"];
      case "FULL_BODY":
        return ["Deadlifts", "Bench Press", "Squats"];
      default:
        return [];
    }
  })();

  const handleNumberOfSetsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > 0) {
      setSets(newValue);
    } else {
      setSets(1);
    }
  };
  const handleNumberOfRepsChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > 0) {
      setReps(newValue);
    } else {
      setReps(1);
    }
  };
  const testToken = async () => {
    try {
      const response = await api.post(`/exercises`, {
        workoutId,
        exerciseDetails: {
          name: selectedExercise,
          sets,
          reps,
        },
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
      <div>
        <label className="label">Select a exercise:</label>
        <div>
          <select
            onChange={handleExerciseChange}
            value={selectedExercise}
            className="select"
          >
            {availableExercise.map((e) => (
              <option key={Math.random()} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <label className="label">Select a number of sets:</label>
        <input
          id="number"
          type="number"
          value={sets}
          onChange={handleNumberOfSetsChange}
        />

        <label className="label">Select a number of reps:</label>
        <input
          id="number"
          type="number"
          value={reps}
          onChange={handleNumberOfRepsChange}
        />
      </div>

      <button type="button" onClick={testToken} className="button">
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

export default AddExercise;

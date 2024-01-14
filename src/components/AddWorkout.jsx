import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
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
  const [workoutName, setWorkoutName] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [availableWorkout, setAvailableWorkouts] = useState([]);
  const { programId } = useParams();
  
  const handleWorkoutChange = (e) => {
    const inputValue = e.target.value;
    setSelectedWorkout(inputValue);
  };
  const handleWorkoutNameChange = (e) => {
    const inputValue = e.target.value;
    setWorkoutName(inputValue);
  };

  useEffect(() => {
    fetchAvailableWorkouts();
  }, [programId]);

  const fetchAvailableWorkouts = async () => {
    try {
      console.log(programId)
      const response = await api.get(`/workouts/${programId}`);
      setAvailableWorkouts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching workouts!", error);
    }
  };

  const addWorkoutToTrainingProgram = async () => {
    try {
      // Assuming you have access to the trainingProgramId, replace it with the actual value
      const trainingProgramId = programId;

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
          {availableWorkout.map((w) => (
            <option key={w.id} value={w.name}>
              {w.name}
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

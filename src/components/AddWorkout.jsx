import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import { WorkoutType, TrainingProgramType } from "../constants";
function AddWorkout() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const { programId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const availableWorkoutTypes = (() => {
    switch (type) {
      case TrainingProgramType.PPL:
        return [WorkoutType.PUSH, WorkoutType.PULL, WorkoutType.LEGS];
      case TrainingProgramType.UPPER_LOWER:
        return [WorkoutType.UPPER, WorkoutType.LOWER];
      case TrainingProgramType.FULL_BODY:
        return [WorkoutType.FULL_BODY];
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
    if (workoutName.length < 3) {
      alert("Name too short");
      return;
    }
    try {
      const trainingProgramId = programId;
      const type =
        selectedWorkout.length > 1 ? selectedWorkout : availableWorkoutTypes[0];
      await api.post("/workouts", {
        trainingProgramId,
        workoutDetails: { name: workoutName, type },
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

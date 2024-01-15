import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../axiosConfig";
import "./AddExercise.css";
import { WorkoutType, Exercise } from "../constants";
function AddExercise() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [reps, setReps] = useState(1);
  const handleExerciseChange = (e) => {
    const inputValue = e.target.value;
    setSelectedExercise(inputValue);
  };
  const [sets, setSets] = useState(1);
  const availableExercise = (() => {
    switch (type) {
      case WorkoutType.PUSH:
        return [
          Exercise.BENCH_PRESS,
          Exercise.OVERHEAD_PRESS,
          Exercise.TRICEP_DIPS,
        ];
      case WorkoutType.PULL:
        return [Exercise.DEADLIFTS, Exercise.PULL_UPS, Exercise.BARBELL_ROWS];
      case WorkoutType.LEGS:
        return [Exercise.SQUATS, Exercise.LUNGES, Exercise.LEG_PRESS];
      case WorkoutType.UPPER:
        return [
          Exercise.BICEP_CURLS,
          Exercise.SHOULDER_PRESS,
          Exercise.LAT_PULLDOWNS,
        ];
      case WorkoutType.LOWER:
        return [
          Exercise.LEG_CURLS,
          Exercise.CALF_RAISES,
          Exercise.HAMMER_STRENGTH_LEG_PRESS,
        ];
      case WorkoutType.FULL_BODY:
        return [Exercise.DEADLIFTS, Exercise.BENCH_PRESS, Exercise.SQUATS];
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
      const name =
        selectedExercise.length > 1 ? selectedExercise : availableExercise[0];
      await api.post(`/exercises`, {
        workoutId,
        exerciseDetails: {
          name,
          sets,
          reps,
        },
      });
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

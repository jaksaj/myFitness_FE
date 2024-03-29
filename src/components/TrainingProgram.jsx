import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import "./TrainingProgram.css";
import WorkoutItem from "./WorkoutItem";

function TrainingProgram() {
  const navigate = useNavigate();
  const { programId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await api.get(`/workouts/${programId}`);
        if (response.status === 200) {
          setWorkouts(response.data);
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error", response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [navigate]);
  const handleDeleteWorkout = (deletedWorkoutId) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout._id !== deletedWorkoutId)
    );
  };

  const handleAddWorkoutClick = () => {
    navigate(`addworkout?type=${type}`);
  };

  return (
    <div className="home-page">
      <h3>YOUR WORKOUTS:</h3>

      <div id="content1">
        <div id="form-section">
          {Array.isArray(workouts) && workouts.length > 0 && (
            <>
              <h2>Your Workouts: </h2>
              <ul className="unorderedList">
                {workouts.map((workout) => (
                  <WorkoutItem
                    key={workout._id}
                    workout={workout}
                    onDelete={handleDeleteWorkout}
                    trainingProgramId={programId}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <button id="plus" onClick={handleAddWorkoutClick}>
        ADD WORKOUT
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="button"
        id="upper"
      >
        BACK
      </button>
    </div>
  );
}

export default TrainingProgram;

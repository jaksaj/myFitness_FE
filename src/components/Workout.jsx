import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import ExerciseItem from "./ExerciseItem";
import { useEffect, useState } from "react";
import api from "../axiosConfig";

function Workout() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const { workoutId } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  console.log(type)

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get(`/exercises/${workoutId}`);
        if (response.status === 200) {
          setExercises(response.data);
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error", response);
        }
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching training programs:", error);
      }
    };
    fetchExercises();
  }, []);
  return (
    <>
      <h3>YOUR EXERCISES:</h3>
      <div>
        <Link to={`addexercise?type=${type}`}>
          <button>ADD EXERCISE</button>
        </Link>
        <div id="form-section">
          {exercises.length > 0 && (
            <>
              <h2>Your Exercises Programs: </h2>
              <ul className="unorderedList">
                {exercises.map((program) => (
                  <ExerciseItem key={program._id} program={program} />
                ))}
              </ul>
            </>
          )}
        </div>
        <button type="button" onClick={()=>navigate(-1)} className="button" id="upper">
        BACK
      </button>
      </div>
    </>
  );
}

export default Workout;

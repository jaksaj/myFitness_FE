import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ExerciseItem from "./ExerciseItem";
import { useEffect, useState } from "react";

function Exercise(params) {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        const fetchExercises = async () => {
          try {
            const response = await api.get("/exercises");
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
    return(
        <div>
            <Link to={"/addexercise"}>
            <button >ADD EXERCISE</button>
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
        </div>
    )
}

export default Exercise;
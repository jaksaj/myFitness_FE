import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";
import AddWorkout from "./AddWorkout";
import WorkoutItem from "./WorkoutItem";


function Workout() {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const response = await api.get("/workouts");
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
  
 
    const handleAddWorkoutClick = () => {
      navigate("/addworkout");
    };
  
    return (
      <>
        <Routes>
          <Route path="/create" Component={FormCreateSplit} />
          <Route path="/addworkout" Component={AddWorkout} />
        </Routes>
        <div className="home-page">
       
          <h3>YOUR WORKOUTS:</h3>
          
          <div id="content1">
            <div id="form-section">
                
              {workouts.length > 0 && (
                <>
                  <h2>Your Workouts: </h2>
                  <ul className="unorderedList">
                    {workouts.map((program) => (
                      <WorkoutItem key={program._id} program={program} />
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <button onClick={handleAddWorkoutClick}>+</button>
          <button type="button" onClick = {() => navigate("/home")}className="button" id="upper">
            HOMEPAGE
            </button>
        </div>
      </>
    );
  }
  
  export default Workout;
  

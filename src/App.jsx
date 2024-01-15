import FormRegistration from "./components/FormRegistration";
import FormSignIn from "./components/FormSignIn";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import FormCreateSplit from "./components/FormCreateSplit";
import TrainingProgram from "./components/TrainingProgram";
import Workout from "./components/Workout";
import AddWorkout from "./components/AddWorkout";
import AddExercise from "./components/AddExercise";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<FormSignIn />} />
          <Route path="/register" element={<FormRegistration />} />
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/create" element={<FormCreateSplit />} />
          <Route
            path="home/trainingProgram/:programId/*"
            element={<TrainingProgram />}
          />
          <Route
            path="home/trainingProgram/:programId/addworkout"
            element={<AddWorkout />}
          />
          <Route
            path="home/trainingProgram/:programId/workout/:workoutId/*"
            element={<Workout />}
          />
          <Route
            path="home/trainingProgram/:programId/workout/:workoutId/addexercise"
            element={<AddExercise />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

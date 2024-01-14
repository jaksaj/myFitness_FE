import FormRegistration from "./components/FormRegistration";
import FormSignIn from "./components/FormSignIn";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
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
          <Route path="/login" Component={FormSignIn} />
          <Route path="/register" Component={FormRegistration} />
          <Route path="/home/*" Component={HomePage} />
          <Route path="/create" Component={FormCreateSplit} />
          <Route path="home/trainingProgram/:programId" element={<TrainingProgram />} />
          <Route path="home/trainingProgram/:programId/addworkout" element={<AddWorkout />} />
          <Route path="home/trainingProgram/:programId/workout/:workoutId" Component={Workout} />
          <Route path="home/trainingProgram/:programId/workout/:workoutId/addexercise" Component={AddExercise} />
          <Route path="/addexercise" Component={AddExercise}/>
        </Routes>
         {/* <FormRegistration></FormRegistration>  */}
      </div>
    </BrowserRouter>
  );
}

export default App;

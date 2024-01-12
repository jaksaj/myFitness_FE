import FormRegistration from "./components/FormRegistration";
import FormSignIn from "./components/FormSignIn";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import HomePage from "./components/HomePage";
import FormCreateSplit from "./components/FormCreateSplit";
import Workout from "./components/Workout";
import Exercise from "./components/Exercise";
import AddWorkout from "./components/AddWorkout";
import AddExercise from "./components/AddExercise";
function App() {
  return (
    
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" Component={FormSignIn} />
          <Route path="/register" Component={FormRegistration} />
          <Route path="/home" Component={HomePage} />
          <Route path="/create" Component={FormCreateSplit} />
          <Route path="/workout" Component={Workout} />
          <Route path="/exercise" Component={Exercise} />
          <Route path="/addworkout" Component={AddWorkout}/>
          <Route path="/addexercise" Component={AddExercise}/>
        </Routes>
         {/* <FormRegistration></FormRegistration>  */}
        {/* <Exercise></Exercise> */}
        <Exercise></Exercise>
      </div>
    </BrowserRouter>
  );
}

export default App;

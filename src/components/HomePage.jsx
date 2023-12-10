import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FormCreateSplit from "./FormCreateSplit";
import { useEffect, useState } from "react";
import api from "../axiosConfig";

function HomePage() {
  const navigate = useNavigate();
  const [trainingPrograms, setTrainingPrograms] = useState([]);

  useEffect(() => {
    const fetchTrainingPrograms = async () => {
      try {
        const response = await api.get("/trainingPrograms");
        if (response.status === 200) {
          setTrainingPrograms(response.data);
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
    fetchTrainingPrograms();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/create" Component={FormCreateSplit} />
      </Routes>
      <h1>Welcome to myFitness</h1>
      <p>Over here you can track your workout splits and add new ones!</p>
      <p>To add new split click "+" below.</p>
      <Link to={"/create"}>
        <button>+</button>
      </Link>
      {trainingPrograms.length > 0 && (
        <>
          <h2>Your Training Programs:</h2>
          <ul>
            {trainingPrograms.map((program) => (
              <li key={program._id}>
                {program.name} - {program.type}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default HomePage;

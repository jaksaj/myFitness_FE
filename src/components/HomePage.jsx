import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axiosConfig";
import "./HomePage.css";
import TrainingProgramItem from "./TrainingProgramItem";

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
  const handleDeleteTrainingProgram = (deletedProgramId) => {
    setTrainingPrograms((prevPrograms) =>
      prevPrograms.filter((program) => program._id !== deletedProgramId)
    );
  };
  return (
    <div className="home-page">
      <div id="header">
        <h1 id="welcome">Welcome to</h1>
        <h1 id="logo">myFitness</h1>
      </div>

      <div id="content1">
        <div id="form-section">
          {trainingPrograms.length > 0 && (
            <>
              <h2>Your Training Programs: </h2>
              <ul className="unorderedList">
                {trainingPrograms.map((program) => (
                  <TrainingProgramItem
                    key={program._id}
                    program={program}
                    onDelete={handleDeleteTrainingProgram}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
        <div id="text-section">
          <p>
            Track your workout splits <br></br>
            and add new ones!
          </p>

          <Link to={"/create"}>
            <button>ADD</button>
          </Link>
          <p>Click button to add new split.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

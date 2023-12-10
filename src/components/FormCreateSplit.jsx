import { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function FormCreateSplit() {
  const navigate = useNavigate();
  const [trainingName, setTrainingName] = useState("");
  const [selectedSplit, setSelectedSplit] = useState("Full_body");

  const handleSplitChange = (e) => {
    const inputValue = e.target.value;
    setSelectedSplit(inputValue);
  };
  const handleTrainingNameChange = (e) => {
    const inputValue = e.target.value;
    setTrainingName(inputValue);
  };

  const back = () => {
    navigate("/home");
  };

  const testToken = async () => {
    if (trainingName.length < 3) {
      alert("Name too short");
      return;
    }
    try {
      const response = await api.post("/trainingPrograms", {
        name: trainingName,
        type: selectedSplit,
      });
      console.log(response);
      back();
    } catch (error) {
      console.error("Error!", error);
    }
  };

  return (
    <div>
      <h2>Create a new training program!</h2>

      <div>
        <label>Training program name:</label>
        <input
          type="text"
          value={trainingName}
          onChange={handleTrainingNameChange}
          placeholder="Enter training name"
        />
      </div>

      <div>
        <label>Select a split:</label>
        <select onChange={handleSplitChange} value={selectedSplit}>
          <option value="PPL">PPL</option>
          <option value="Full_body">Full body</option>
          <option value="Upper_lower">Upper-Lower</option>
        </select>
      </div>

      <button type="button" onClick={back}>
        BACK
      </button>

      <button type="button" onClick={testToken}>
        CREATE
      </button>
    </div>
  );
}

export default FormCreateSplit;

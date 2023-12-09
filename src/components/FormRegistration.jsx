import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function FormRegistration() {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUsernameValid, changeIsUsernameValid] = useState(true);
  const [isEmailValid, changeIsEmailValid] = useState(true);
  const [isPasswordValid, changeIsPasswordValid] = useState(true);

  const handleRegistration = async (event) => {
    event.preventDefault();

    validateInputs();

    if (isUsernameValid && isEmailValid && isPasswordValid) {
      registerUser(registrationData);
    }
  };
  const validateInputs = () => {
    const { username, email, password } = registrationData;

    username.length < 4
      ? changeIsUsernameValid(false)
      : changeIsUsernameValid(true);

    !email.includes("@") || email.length < 5
      ? changeIsEmailValid(false)
      : changeIsEmailValid(true);

    password.length < 8
      ? changeIsPasswordValid(false)
      : changeIsPasswordValid(true);
  };
  function inputChange(event) {
    const { name, value } = event.target;
    setRegistrationData({ ...registrationData, [name]: value });
  }
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users",
        userData
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Registration successful!", response.data);
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Error during registration!", response.data);
      }
    } catch (error) {
      console.error("Error during registration!", error);
    }
  };

  return (
    <>
      <form onSubmit={handleRegistration}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={registrationData.username}
              onChange={inputChange}
              required
            />
          </label>
          <div style={{ color: "red" }}>
            {!isUsernameValid && "Username can not be shorter than 4 units!"}
          </div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={registrationData.email}
              onChange={inputChange}
              required
            />
          </label>
          <div style={{ color: "red" }}>
            {!isEmailValid && "This is not a valid email address"}
          </div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={registrationData.password}
              onChange={inputChange}
              required
            />
          </label>
          <div style={{ color: "red" }}>
            {!isPasswordValid && "Password can not be shorter than 8 units!"}
          </div>
        </div>

        <button type="submit">Register!</button>
      </form>
      <p>
        You already have a account?<Link to={"/login"}>Sign in.</Link>
      </p>
    </>
  );
}

export default FormRegistration;

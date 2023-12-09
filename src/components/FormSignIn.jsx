import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function FormSignIn() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [isEmailValid, changeIsEmailValid] = useState(true);
  const [isPasswordValid, changeIsPasswordValid] = useState(true);
  function inputChange(event) {
    const { name, value } = event.target;
    setSignInData({ ...signInData, [name]: value });
  }
  const handleSignIn = async (event) => {
    event.preventDefault();
    validateInputs();
    if (isEmailValid && isPasswordValid) {
      signInUser(signInData);
    }
  };
  const validateInputs = () => {
    const { email, password } = signInData;

    !email.includes("@") || email.length < 5
      ? changeIsEmailValid(false)
      : changeIsEmailValid(true);

    password.length < 8
      ? changeIsPasswordValid(false)
      : changeIsPasswordValid(true);
  };

  const signInUser = async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { userData }
      );

      if (response.status === 200) {
        console.log("Log in complete!", response.data);
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Error with sign in!", response.data);
      }
    } catch (error) {
      console.error("Error with sign in!", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSignIn}>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={signInData.email}
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
              value={signInData.password}
              onChange={inputChange}
              required
            />
          </label>
          <div style={{ color: "red" }}>
            {!isPasswordValid && "Password can not be shorter then 8 units!"}
          </div>
        </div>

        <button type="submit">Sign in!</button>
      </form>
      <p>
        You do not have a account? <Link to={"/register"}>Register!</Link>
      </p>
    </>
  );
}
export default FormSignIn;

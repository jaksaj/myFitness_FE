import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function FormRegistration() {
    const [registrationData, setRegistrationData] = useState({
        username: "",
        mail: "",
        password: ""
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
      const {username, mail, password } = SignInData;
      if (username.length < 4) {
        changeIsUsernameValid(false)
      }
      else{
        changeIsUsernameValid(true)
      }
  
      if (!mail.includes("@")) {
        changeIsEmailValid(false);
      } else {
        changeIsEmailValid(true);
      }

      if (password.length < 8) {
        changeIsPasswordValid(false);
      } else {
        changeIsPasswordValid(true);
      }
    };
    function inputChange(event) {
      const { name, value } = event.target;
      setRegistrationData({ ...registrationData, [name]: value });
    }
    const registerUser = async (userData) => {
      try {
        const response = await axios.post('http://localhost:3000', userData);
        if (response.ok) {
          
          const responseData = await response.json();
          console.log('Registration successful!', responseData);
          localStorage.setItem('token', responseData.token);
        } else {
          const errorData = await response.json();
          console.error('Error during registration!', errorData);
        }
      } catch (error) {
        console.error('Error during registration!', error);
      }
    };
    
    return(
      <>
        <form onSubmit={handleRegistration}>
          <div>
            <label>Username:
              <input
                type='text'
                name='username'
                value={registrationData.username}
                onChange={inputChange}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!isUsernameValid && 'Username can not be shorter than 4 units!'}
            </div>
            <label>Mail:
              <input
                type='text'
                name='mail'
                value={registrationData.mail}
                onChange={inputChange}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!isEmailValid && 'Email must contain @!'}
            </div>
            <label>Password:
              <input
                type='text'
                name='password'
                value={registrationData.password}
                onChange={inputChange}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!isPasswordValid && 'Password can not be shorter than 8 units!'}
            </div>
          </div>
          
          <button type="submit">Register!</button>
        </form>
        <p>
          You already have a account?<Link to={"/login"}>Sign in.</Link>
        </p>
      </>
    )
    
}

export default FormRegistration;


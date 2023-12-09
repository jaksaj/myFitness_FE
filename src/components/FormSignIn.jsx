import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function FormSignIn() {
    const [SignInData, setSignInData] = useState({
        mail: "",
        password: ""
      });
    const [isEmailValid, changeIsEmailValid] = useState(true);
    const [isPasswordValid, changeIsPasswordValid] = useState(true);
    function inputChange(event) {
      const { name, value } = event.target;
      setSignInData({ ...SignInData, [name]: value });
    }
    const handleSignIn = async (event) => {
      event.preventDefault(); 
      validateInputs();
      if (isEmailValid && isPasswordValid) {
        signInUser(SignInData);
      }  
    };
    const validateInputs = () => {
      const { mail, password } = SignInData;
  
      // Validate email
      if (!mail.includes("@")) {
        changeIsEmailValid(false);
      } else {
        changeIsEmailValid(true);
      }
  
      // Validate password
      if (password.length < 8) {
        changeIsPasswordValid(false);
      } else {
        changeIsPasswordValid(true);
      }
    };
    
    const signInUser = async (userData) => {
      try {
        const response = await axios.post('http://localhost:3000', { userData });
    
        if (response.ok) {
          
          const responseData = await response.json();
          console.log('Log in complete!', responseData);
          localStorage.setItem('token', responseData.token);
        } else {
          
          const errorData = await response.json();
          console.error('Error with sign in!', errorData);
        }
      } catch (error) {
        console.error('Error with sign in!', error);
      }
    };
    return(
      <>
        <form onSubmit={handleSignIn}>
          <div>
            <label>Mail:
              <input
                type='text'
                name='mail'
                value={SignInData.mail}
                onChange={inputChange}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!isEmailValid && 'Email must contain @!'}
            </div>
            <label>Lozinka:
              <input
                type='text'
                name='password'
                value={SignInData.password}
                onChange={inputChange}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!isPasswordValid && 'Password can not be shorter then 8 units!'}
            </div>
          </div>
          
          <button type="submit">Sign in!</button>
        </form>
        <p>
          You do not have a account? <Link to={"/register"}>Register!</Link>
        </p>
      </>
    )
}
export default FormSignIn;


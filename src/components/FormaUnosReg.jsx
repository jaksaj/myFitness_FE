import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function FormaUnosReg(props) {
    const [formaPodaciReg, postaviPodatke] = useState({
        username: "",
        mail: "",
        lozinka: ""
      });
    const [ispravanUnosUsername, postaviIspravanUnosUsername] = useState(true);
    const [ispravanUnosMail, postaviIspravanUnosMail] = useState(true);
    const [ispravanUnosLozinka, postaviIspravanUnosLozinka] = useState(true);
    
    const handleRegistracija = async (event) => {
      event.preventDefault(); 

      if (ispravanUnosUsername && ispravanUnosMail && ispravanUnosLozinka) {
        registerUser(formaPodaciReg);
      }  
    };
    function promjenaUlaza(event) {
      const { name, value } = event.target;
      if ( name === "username"  && /\d/.test(value)) {
        postaviIspravanUnosUsername(false) 
      }
      else{
        postaviIspravanUnosUsername(true);
        postaviPodatke({ ...formaPodaciReg, [name]: value });
      }
      if ( name === "mail"  && !value.includes("@")) {
        postaviIspravanUnosMail(false) 
      }
      else{
        postaviIspravanUnosMail(true);
        postaviPodatke({ ...formaPodaciReg, [name]: value });
      }
      if ( name === "lozinka" && value.length<7){
        postaviIspravanUnosLozinka(false)
      }
      else{
        postaviIspravanUnosLozinka(true);
        postaviPodatke({ ...formaPodaciReg, [name]: value })
      }
      console.log(formaPodaciReg)
    }
    const registerUser = async (userData) => {
      try {
        const response = await axios.post('http://localhost:3000', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          
          const responseData = await response.json();
          console.log('Registracija uspjela:', responseData);
          //primamo token
          localStorage.setItem('token', responseData.token);
        } else {
          
          const errorData = await response.json();
          console.error('Greška prilikom registracije:', errorData);
        }
      } catch (error) {
        console.error('Greška prilikom registracije:', error);
      }
    };
    
    return(
      <>
        <form onSubmit={handleRegistracija}>
          <div>
            <label>Username:
              <input
                type='text'
                name='username'
                value={formaPodaciReg.username}
                onChange={promjenaUlaza}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!ispravanUnosUsername && 'Username ne smije sadržavati brojeve!'}
            </div>
            <label>Mail:
              <input
                type='text'
                name='mail'
                value={formaPodaciReg.mail}
                onChange={promjenaUlaza}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!ispravanUnosMail && 'Mail mora sadržavati @!'}
            </div>
            <label>Lozinka:
              <input
                type='text'
                name='lozinka'
                value={formaPodaciReg.lozinka}
                onChange={promjenaUlaza}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!ispravanUnosLozinka && 'Lozinka mora sadržavati bar 8 znakova!'}
            </div>
          </div>
          
          <button type="submit">Registriraj se!</button>
        </form>
        <p>
          Več imate račun? <Link to={"/login"}>Prijavite se!</Link>
        </p>
      </>
    )
    
}

export default FormaUnosReg;

//vidit kako poruku za uvjete odjednon poslat kad se stisne na botun
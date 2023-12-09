import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function FormaUnosSig(props) {
    const [formaPodaciSig, postaviPodatke] = useState({
        mail: "",
        lozinka: ""
      });
    const [ispravanUnos5, postaviIspravanUnos5] = useState(true);
    const [ispravanUnos6, postaviIspravanUnos6] = useState(true);
    function promjenaUlaza(event) {
      const { name, value } = event.target;
      postaviPodatke({ ...formaPodaciSig, [name]: value });
    }
    const handlePrijava = async (event) => {
      event.preventDefault(); 

      if (ispravanUnos5 && ispravanUnos6) {
        signUser(formaPodaciSig);
      }
    };
    function promjenaUlaza(event) {
      const { name, value } = event.target;
      if ( name === "mail"  && !value.includes("@")) {
        postaviIspravanUnos5(false) 
      }
      else{
        postaviIspravanUnos5(true);
        postaviPodatke({ ...formaPodaciSig, [name]: value });
      }
      if ( name === "lozinka" && value.length<7){
        postaviIspravanUnos6(false)
      }
      else{
        postaviIspravanUnos6(true);
        postaviPodatke({ ...formaPodaciSig, [name]: value })
      }
      console.log(formaPodaciSig)
    }
    const signUser = async (userData) => {
      try {
        const response = await axios.post('http://localhost:3000', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        if (response.ok) {
          
          const responseData = await response.json();
          console.log('Prijava uspjela:', responseData);
          //primamo token
          localStorage.setItem('token', responseData.token);
        } else {
          
          const errorData = await response.json();
          console.error('Greška prilikom prijave:', errorData);
        }
      } catch (error) {
        console.error('Greška prilikom prijave:', error);
      }
    };
    return(
      <>
        <form onSubmit={handlePrijava}>
          <div>
            <label>Mail:
              <input
                type='text'
                name='mail'
                value={formaPodaciSig.mail}
                onChange={promjenaUlaza}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!ispravanUnos5 && 'Mail mora sadržavati @!'}
            </div>
            <label>Lozinka:
              <input
                type='text'
                name='lozinka'
                value={formaPodaciSig.lozinka}
                onChange={promjenaUlaza}
                required
              />
            </label>
            <div style={{ color: 'red' }}>
              {!ispravanUnos6 && 'Lozinka mora sadržavati bar 8 znakova!'}
            </div>
          </div>
          
          <button type="submit">Registrirajte se!</button>
        </form>
        <p>
          Nemate račun? <Link to={"/register"}>Registrirajte se!</Link>
        </p>
      </>
    )
}
export default FormaUnosSig;

//vidit kako poruku za uvjete odjednon poslat kad se stisne na botun
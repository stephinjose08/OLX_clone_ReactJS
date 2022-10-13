import React, { useState,useContext, createContext ,useEffect} from 'react';
import {Context} from '../../firbase/store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'
function Login() {
const [Email, setEmail] = useState('')
const [Password, setPassword] = useState('')
const {firebase}=useContext(Context)
const [formErrors,setFormErrors]=useState({})
const [isSubmit,setIsSubmit]=useState(false)
const history=useHistory()
const handleLogin=(e)=>{
e.preventDefault()
setFormErrors(Validate);
setIsSubmit(true)
firebase.auth().signInWithEmailAndPassword(Email,Password).then(()=>{
  history.push('/')
// }).catch((error)=>{
//   alert(error.message)
})
}
const Validate=()=>{
  const errors={}
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
  if(!Email){
    errors.Email="email is required"
  }
  else if(!mailformat.test(Email)){
    errors.Email="invalid email format"
  }
  
  
  if(!Password){
    errors.Password="password is required"
  }
  else if(Password.length<4){
    errors.Password="password need 4 or more charactor"
  }
  return errors;
}

useEffect(() => {
  console.log(formErrors)
  if(Object.keys(formErrors).length===0 && isSubmit){
   console.log("no error")
  }
 
   
 }, [formErrors])

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onClick={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
           value={Email}
           onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <p style={{color: "red"}}>{formErrors.Email}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
           value={Password}
           onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <p style={{color: "red"}}>{formErrors.Password}</p>
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;

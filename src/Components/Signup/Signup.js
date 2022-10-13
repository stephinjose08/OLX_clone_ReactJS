import React,{useState,useContext,useEffect} from 'react';
import { Context } from '../../firbase/store/Context';
import{useHistory, useNavigate} from 'react-router-dom';
import Logo from '../../olx-logo.png'; 
import './Signup.css';

export default function   Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {firebase}=useContext(Context)
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  const history=useHistory()
   
  
  
  
  const handleSubmit =(e)=>{ 
e.preventDefault()
setFormErrors(Validate);
setIsSubmit(true)
firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
  result.user.updateProfile({displayName:username}).then(()=>{
    firebase.firestore().collection('users').add({
      id:result.user.uid,
      username:username,
      phone:phone
    }).then(()=>{
     history.push("/login")
    })
  })
})
  }
  const Validate=()=>{
    const errors={}
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!username){
      console.log("username empty")
      errors.username="username is required"
     
    }
    if(!email){
      errors.email="email is required"
    }
    else if(!mailformat.test(email)){
      errors.email="invalid email format"
    }
    var numbers = /^[0-9]+$/
    if(!phone){
      errors.phone="phone is required"
    }
    
    if(!password){
      errors.password="password is required"
    }
    else if(password.length<4){
      errors.password="password need 4 or more charactor"
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
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onClick={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
          value={username}
           onChange={(e)=>setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <p style={{color: "red"}} >{formErrors.username}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <p style={{color: "red"}}>{formErrors.email}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <p style={{color: "red"}}>{formErrors.phone}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <p style={{color: "red"}}>{formErrors.password}</p>
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}

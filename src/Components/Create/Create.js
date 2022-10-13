import React, { Fragment, useContext, useState,useEffect } from 'react';
import './Create.css';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Contextuser, {Context,AuthContext} from '../../firbase/store/Context' 
const Create = () => {
  const{firebase}=useContext(Context)
  const{user}=useContext(AuthContext)
  const [Name, setName] = useState('')
  const [Category, setCategory] = useState('')
  const [Price, setPrice] = useState('')
  const [File, setFile] = useState('')
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  const date=new Date()
  const history=useHistory()
  const handleSubmit=()=>{
    setFormErrors(Validate)
    setIsSubmit(true)
    if(Object.keys(formErrors).length===0 && isSubmit){
      
     
    firebase.storage().ref(`/image/${File.name}`).put(File).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
      
        firebase.firestore().collection('product').add({
          name:Name,
          category:Category,
          price:Price,
          url:url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history.push('/')
      })
    })
    }
  }
  const Validate=()=>{
    const errors={}
    if(!Name){
      
      errors.Name="Name is required"
     
    }
    if(!Category){
      errors.Category="Category is required"
    }
    
    
    if(!Price){
      errors.Price="Price is required"
    }
    
    if(!File){
      errors.File="File is required"
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
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
      
            <label htmlFor="fname">Name</label>
            <br />
            <input
            value={Name}
            onChange={(e)=>setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <p style={{color: "red"}} >{formErrors.Name}</p>

            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              value={Category}
              onChange={(e)=>setCategory(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <p style={{color: "red"}} >{formErrors.Category}</p>

            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            value={Price}
            onChange={(e)=>setPrice(e.target.value)}
            className="input" type="number" id="fname" name="Price" />
            <br />
            <p style={{color: "red"}} >{formErrors.Price}</p>

          <br />
          <img alt="Posts" width="200px" height="200px" src={File ? URL.createObjectURL(File):'' }></img>
        
            <br />
            <input 
            
            onChange={(e)=>setFile(e.target.files[0])}
            type="file" />
            <br />
            <p style={{color: "red"}} >{formErrors.File}</p>

            <button 
            onClick={handleSubmit}
            className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

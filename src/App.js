import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Create  from './Components/Create/Create';
/**
 * ?  =====Import Components=====
 */
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Home from './Pages/Home';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext, Context } from './firbase/store/Context';
import View from './Pages/ViewPost'
import Post from './firbase/store/PostContext'
function App() {
 const {setUser}= useContext(AuthContext)
 const {firebase} =useContext(Context)
  useEffect(()=>{
firebase.auth().onAuthStateChanged((user)=>{
  setUser(user)
})
  })
  return (
    <div>
  <Post>
      <Router>
        <Route exact path='/'>
      <Home />
      </Route>
     
      <Route path='/signup'>
      <Signup/>
      </Route>

      <Route path='/login'>
      <Login/>
      </Route>

      <Route path='/create'>
      <Create/>
      </Route>

      <Route path='/view'>
     <View/>
      </Route>

      </Router>
</Post>
    </div>
  );
}

export default App;

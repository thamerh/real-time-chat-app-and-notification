import react, { useEffect } from "react";
import './App.css';
import {BrowserRouter,Route,Redirect} from "react-router-dom";
import Singup from './components/Auth/Singup';
import Login from './components/Auth/Login';
import Chat from './components/Chat';
function App() {
  const user= JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="App" >
      <BrowserRouter>
      {! user && <Route  exact path="/" > <Redirect  to="/login" /></Route>}
      {user && <Route exact path="/" ><Chat/></Route>} 
        <Route  path="/singup" ><Singup/></Route>
         <Route path="/login" ><Login/></Route>
      </BrowserRouter>
   </div>

  );
}

export default App;

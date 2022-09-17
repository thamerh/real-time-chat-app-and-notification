import react from "react";
import './App.css';
import {BrowserRouter,Route,Redirect} from "react-router-dom";
import Singup from './components/Singup';
import Login from './components/Login';
import Chat from './components/Chat';
function App() {
  const user = localStorage.getItem("userInfo");
  return (
    <div className="App" >
      <BrowserRouter>
        <Route  path="/signup" ><Singup/></Route>
         <Route path="/login" ><Login/></Route>
         {user && <Route exact path="/" ><Chat/></Route>} 
        {! user && <Route  exact path="/" > <Redirect  to="/login" /></Route>}
      </BrowserRouter>
   </div>

  );
}

export default App;



import { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
//components
import Home from './Copmonents/Home';
import WorkersView from "./Copmonents/view/WorkersView";
import AddWorker from './Copmonents/AddWorker';
import WorkerDetails from './Copmonents/WorkerDetails';
import Navi from "./Copmonents/Navigation";
import AddBranch from './Copmonents/AddBranch'
import UserProvider from "./Copmonents/user/UserProvider";
import UserContext from './Copmonents/user/UserContext'
import NewUser from './Copmonents/formsForAdd/NewUser';

import logo from '../src/images/logo.png';


function App() {
  //context - user
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    if (userIdFromLocalStorage) setUserId(userIdFromLocalStorage);
  }, []);


  const setUserIdCallback = (id) => {
    console.log(id);
    setUserId(id);
  }

  const user = useContext(UserContext);
  
  useEffect(() => {
    console.log("user",user);
  }, [user]);
        

  return (
    <UserProvider userId = {userId}>

      {!userId  ? <Home setUserId={setUserIdCallback} /> : <div className="App" >
        <div style={{ height:"60px", backgroundColor: "gray"}}>
          {user && <div> מנהלת {user.name} שלום</div>} 
          {console.log("uuuuuu",user)}
          <h1 className="mt-0 mb-3" style={{position:"absolute" , right:"60px",top:"0px"}}> שלום מנהלת</h1>
          <img  style={{ height:"60px", width:"600px" , position:"absolute" , left:"25px"}} src={logo} ></img>
      </div>
        <Navi></Navi>

        <div className="App">
          <Routes>
            <Route exact path='/addBranch' element={<AddBranch />}></Route>

            <Route exact path='/addWorker' element={< AddWorker details={null}/>}></Route>
            <Route exact path='/addWorker/:workerId' element={< AddWorker />}></Route>
            <Route exact path='/' element={< WorkersView />}></Route>

            <Route exact path='/Worker' element={< WorkersView />}></Route>
            <Route exact path='/workerDetails' element={< WorkerDetails />}></Route>
            <Route exact path='/workerDetails/:workerId' element={< WorkerDetails />}></Route>
            <Route exact path='/user' element={< NewUser />}></Route>
          </Routes>
        </div>


      </div>}
    </UserProvider>
  );
}

export default App;

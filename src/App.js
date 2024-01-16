// import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./componenets/Navbar/Navbar";
import AccountDashboard from "./componenets/Dashboard/AccountDashboard";
// import Home from "./componenets/Dashboard/Home";
import Login from "./componenets/Forms/Login";
import Register from "./componenets/Forms/Register";
import AccountDetails from "./componenets/Dashboard/AccountDetails";
import AddAccount from "./componenets/Forms/AddAccount";
import AddTransaction from "./componenets/Forms/AddTransaction";
import UpdateTransaction from "./componenets/Forms/UpdateTransaction";
import Home from "./componenets/Dashboard/Home";
import { useState } from "react";
import Alert from "./componenets/Navbar/Alert";

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },2000)
  }
  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <div >
    <Routes>
      
      <Route path="/" element={<Home   /> }/>
      <Route path="/register" element={<Register showAlert={showAlert} />}/>
      <Route path="/login" element={<Login  showAlert={showAlert} />}/>
      <Route path="/dashboard" element={<AccountDashboard  showAlert={showAlert}/>  }/>
      <Route path="/account-details/:accountID" element={<AccountDetails showAlert={showAlert} />  }/>
      <Route path="/dashboard/create-account" element={<AddAccount showAlert={showAlert} />  }/>
      <Route path="/create-transaction/:accountID" element={<AddTransaction showAlert={showAlert} /> }/>
      <Route path="/dashboard/update-transaction/:transactionID" element={<UpdateTransaction  showAlert={showAlert}/> }/>
      {/* <Route path="/delete-transaction/:accountID" element={<AddTransaction/>}/> */}

    
      
    </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;

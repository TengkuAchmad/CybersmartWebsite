// STYLE IMPORT
import './Style/App.css';

// LIBRARY IMPORT
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// PAGE IMPORT
import Login from "./Pages/Login"
import Logout from "./Pages/Logout"
import Register from "./Pages/Register"
import Passreset from "./Pages/Passreset"
import OTPCheck from "./Pages/OTPCheck"
import Passchange from "./Pages/Passchange"
import Passresetstate from "./Pages/Passresetstate"
import Dashboard from './Pages/Dashboard'
import Validate from './Pages/Validate'
import Service from './Pages/Service'
import Aspiration from './Pages/Aspiration'
import Products from './Pages/Products'

// ====================== MAIN CODE ========================
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgotpass' element={<Passreset />}></Route>
        <Route path='/otpcheck' element={<OTPCheck />}></Route>
        <Route path='/passchange' element={<Passchange />}></Route>
        <Route path='/passresetstate' element={<Passresetstate />}></Route>
        <Route path='/validate' element={<Validate />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        
        {/* DASHBOARD */}
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/services' element={<Service />}></Route>
        <Route path='/aspiration' element={<Aspiration />}></Route>
        <Route path='/products' element={<Products />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
// ====================== END CODE ========================

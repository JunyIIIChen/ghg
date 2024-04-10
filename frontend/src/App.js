import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './HomePage'; 
import FinalPage from './finalpage'; 
import Calculate from './calculate'; 
import ReportWebVitals from './reportWebVitals';
import Navbarphoto from './photo/firstpage.jpeg';

function Navbar() {
  return (
    <div 
    className="navbar"
    style={{
      backgroundColor:'black',
      
    }}
  >
          <div className="nav-logo">
            <img src={Navbarphoto} alt="Electricity"  style={{borderRadius:'50%',height:'100%'}}/>
          </div>
          <div style={{width: "30%",color:"white",alignItems:'center',display:"flex"}}>
              <text>CYBERHAWK Climate Action
              </text>
          </div>
          <div className="nav-links" style={{alignItems:'center',display:"flex"}}>
              <nav>
                  <ul className="nav-menu">
                      <li style={{marginLeft:'20%'}}>
                          <Link to="/" className="nav-link">Introduction</Link>
                      </li>
                      <li style={{marginLeft:'20%'}}>
                          <Link to="/calculate" className="nav-link">calculate</Link>
                      </li>
                      <li style={{marginLeft:'20%'}}>
                          <Link to="/final" className="nav-link">knowledge</Link> {/* 注意拼写修正 */}
                      </li>
                  </ul>
              </nav>
          </div>
      </div>
  );
}

  
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

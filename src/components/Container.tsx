import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./LoginPage";
import MyAccountPage from "./MyAccountPage";

function Container() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-account" element={<MyAccountPage/>}/>
        <Route/> 
      </Routes>
    </div>
  );
}

export default Container;

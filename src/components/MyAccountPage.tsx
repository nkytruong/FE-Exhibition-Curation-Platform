import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function MyAccountPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout().then(() => {
        navigate("/");
      });
    };
  
    // if (!user) {
    //   return <p>Loading user info...</p>; // 🔥 Show a loading state
    // }
  
    return (
        <div className="page-container">
          {user ? (
            <div>
              <h1>Welcome, {user.first_name}!</h1> 
              <p>Your account details go here.</p>
              <Button variant="danger" onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <p>You are not logged in. <a href="/login">Login</a></p>
          )}
        </div>
      );
      
  }
  
  export default MyAccountPage
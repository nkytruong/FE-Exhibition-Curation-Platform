import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MyCollectionsPage from "./MyCollectionsPage";
import Alert from "react-bootstrap/Alert";

function MyAccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout().then(() => {
      navigate("/");
    });
  }

  return (
    <div className="page-container">
      {user ? (
        <div>
          <h1>Hello, {user.first_name}!</h1>
          <p>{user.email}</p>
          <Button variant="secondary" onClick={handleLogout}>
            Log Out
          </Button>
          <hr />
          <MyCollectionsPage />
        </div>
      ) : (
        <Alert variant="warning">You are not logged in</Alert>
      )}
    </div>
  );
}

export default MyAccountPage;

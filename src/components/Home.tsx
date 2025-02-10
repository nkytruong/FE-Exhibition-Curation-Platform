import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homepage-container">
      <h1>Welcome to EXHIBIT</h1>
      <div className="content-wrapper">
        <h4>
          Explore a virtual exhibition with artwork from different art museums.
        </h4>
        <h6>Curate your own exhibitions of your favourite art pieces!</h6>
        <p>
          <Link
            to="/browse"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Start browsing now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;

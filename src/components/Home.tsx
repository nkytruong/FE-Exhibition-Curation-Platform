import { TypeAnimation } from "react-type-animation";
import fruit from "../assets/fruit.jpg";
import statue from "../assets/statue.jpg";
import crowd from "../assets/crowd.jpg"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function onCurateButtonClicked() {
    navigate("/browse")
  }


  return (
    <div className="homepage-container">
      <div className="gallery-image">
        <h1 id="exhibit-title">EXHIBIT</h1>
      </div>
      <div className="section-box">
        <div className="section-1-image">
          <div className="text-animation">
            <TypeAnimation
              sequence={[
                "Explore the World's Greatest Art — From Wherever You Are",
                2000,
                () => {
                  console.log("Sequence completed");
                },
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="responsive-title-1"
              // style={{ fontSize: "3em", display: "inline-block" }}
            />
            <p className="responsive-intro-1">
              Immerse yourself in stunning high-resolution imagery and stroll
              through virtual galleries that bring art straight to your screen.
              Discover the beauty of each piece as if you were standing before
              it in person.
            </p>
          </div>
          <img src={statue} alt="Greek Statue" className="statue-image" />
        </div>
      </div>
      <div className="section-box reverse">
        <div className="section-1-image">
          <div className="text-animation">
            <TypeAnimation
              sequence={[
                "Discover. Collect. Curate.",
                2000,
                () => {
                  console.log("Sequence completed");
                },
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="responsive-title-1"
              // style={{ fontSize: "3em", display: "inline-block" }}
            />
            <p className="responsive-intro-1">
              Dive into art history, uncover hidden gems, and curate your own collections. From Renaissance masters to cutting-edge contemporary pieces, discover art you didn't know you loved . Assemble your finds into bespoke galleries that reflect your tastes and passions.
            </p>
          </div>
          <img
            src={fruit}
            alt="Fruit and food museum piece"
            className="fruit-image"
          />
        </div>
      </div>
      <div className="section-box">
        <div className="section-1-image">
          <div className="text-animation">
            <TypeAnimation
              sequence={[
                "Your Personal Museum Awaits.",
                2000,
                () => {
                  console.log("Sequence completed");
                },
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="responsive-title-1"
              // style={{ fontSize: "3em", display: "inline-block" }}
            />
            <p className="responsive-intro-1">
              Step inside a world of curated masterpieces — no ticket required and no crowds to navigate. Enjoy stunningly detailed art from global collections at your own pace, lose yourself in every brushstroke, and let each view spark your next inspiration. 
            </p>
            <Button variant="outlined" size="large" onClick={onCurateButtonClicked}>Start Curating</Button>
          </div>
          <img
            src={crowd}
            alt="Crowd surrounding painting"
            className="crowd-image"
          />
        </div>
      </div>
      
      {/* <Link
            to="/browse"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Start browsing now
          </Link>
        </p> */}
    </div>
  );
}

export default Home;

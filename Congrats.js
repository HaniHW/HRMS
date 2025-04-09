import "./Congrats.css";
import { useNavigate } from "react-router-dom";

const Congrats = () => {
  const navigate=useNavigate();

  return (
    <div className="screen">
      <div className="left-section">
        <img
          src={require("../assets/illustration.png")}
          alt="Illustration"
          className="illustration"
        />
      </div>
      <div className="right-section">
        <h2>Congratulations 🎉</h2>
        <p>You have successfully completed the process</p>
        <button className="login-btn" onClick={() => navigate("/")}>Login</button>
      </div>
    </div>
  );
};

export default Congrats;

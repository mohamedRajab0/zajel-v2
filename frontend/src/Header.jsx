import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGOUT from "./assets/logout.webp";
import AuthContext from "./context/AuthContext";
import Friendlist from "./friends/Friendlist";
import "./Header.css";
import appIcon from './assets/zagel.png';

function Header() {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => logoutUser();
  const goToProfile = () => navigate("/profile");

  return (
    <header className="upperpart">
      {/* Use Link for SPA navigation */}
      <Link to="/">
        <img src={appIcon} alt="icon" className="app-icon" />
      </Link>
      <div className="button-container">
        <Friendlist />
        <button onClick={goToProfile}>Profile</button>
        <button className="logout" onClick={handleLogout}>
          <img src={LOGOUT} alt="Logout" width="35" height="35" />
        </button>
      </div>
    </header>
  );
}

export default Header;

import { Link, useLocation } from "react-router-dom";
import "./App.css";

function Header() {
  const location = useLocation();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{"logged_in": false}');

  // Extract the pathname from the location object
  const currentPath = location.pathname;
  const shouldShowLink = currentPath !== '/createuser' && currentPath !== '/login' && userInfo['logged_in'];

  return (
    <header className="header">
      <ul className="nav-list">
        <li className="nav-home">
          <Link to="/" className="nav-link"><b>Enlightened</b></Link>
        </li>
      </ul>
      {shouldShowLink && (
          <div className="nav-right-items">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/search" className="nav-link">Search</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Logout</Link> 
            </li>
          </ul>
          </div>
        )}
    </header>
  );
};

export default Header;
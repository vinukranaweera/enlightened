import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
        <a><Link to="/services">Services</Link></a>
        <a><Link to="/about">About</Link></a>
        <a><Link to="/terms">Terms</Link></a>
        <a><Link to="/privacy">Privacy Policy</Link></a>
        <a><Link to="">&copy; 2023 Enlightened. All rights reserved.</Link></a>
    </footer>
  );
};

export default Footer;
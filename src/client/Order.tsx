import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Order() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{"logged_in": false}');

  if (!userInfo['logged_in']) {
    window.location.href = "/login";
  }
  sessionStorage.setItem("cartItems", JSON.stringify({}));

  return (
    <div>
      <Header/>
      <h1 className="order-header">Order Confirmed!</h1>
      <Link to="/"><a className="back-to-home-link">Go to Home</a></Link>
      <Footer/>
    </div>
  );
}

export default Order;
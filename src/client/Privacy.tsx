import "./index.css";
import Header from "./Header";
import Footer from "./Footer";

function Privacy() {
    return (
        <div>
         <Header/>
            <section className="footer-links-container">
                <h2>Information We Collect</h2>
                <p>At our book store, we may collect the following types of personal information:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Shipping and billing addresses</li>
                    <li>Phone number</li>
                    <li>Credit card information (if applicable)</li>
                </ul>
                <p>We may also collect non-personal information such as the pages you visit on our website, the type of browser you use, and your IP address.</p>

                <h2>How We Use Your Information</h2>
                <p>We use your personal information to:</p>
                <ul>
                    <li>Process your orders and payments</li>
                    <li>Deliver your purchases</li>
                    <li>Communicate with you about your orders</li>
                    <li>Provide customer service</li>
                    <li>Send you promotional offers and newsletters (if you opt in)</li>
                </ul>
                <p>We do not share your personal information with third parties for marketing purposes.</p>

                <h2>Cookies and Other Technologies</h2>
                <p>We use cookies and other technologies such as web beacons and pixel tags to improve your experience on our website. Cookies are small files that are stored on your device when you visit our site. They help us remember your preferences and provide a personalized experience. You can choose to disable cookies in your browser settings, but please note that some features of our website may not work correctly without them.</p>
                <h2>Security</h2>
                <p>We take the security of your personal information seriously and use reasonable measures to protect it from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                <h2>Changes to this Policy</h2>
                <p>We may update this privacy policy from time to time by posting a new version on our website. Please check this page periodically for any changes. Your continued use of our website after any modifications to the policy constitutes your acceptance of the changes.</p>
            </section>
        <Footer/>
    </div>
    );
}
    
export default Privacy;
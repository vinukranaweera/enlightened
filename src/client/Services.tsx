import "./index.css";
import Header from "./Header";
import Footer from "./Footer";

function Services() {
    return (
        <div>
            <Header />
            <section className="footer-links-container">
                <h2>Our Services</h2>
                <p>At our book store, we offer a variety of services to meet the needs of our customers. Some of our most popular services include:</p>
                <ul>
                    <li><strong>Book Sales:</strong> We offer a wide selection of books, including bestsellers, classics, and new releases. We also carry a variety of genres, such as fiction, non-fiction, romance, and mystery.</li>
                    <li><strong>Special Orders:</strong> If you're looking for a specific book that we don't have in stock, we can order it for you. We'll let you know when it arrives and hold it for you for up to two weeks.</li>
                    <li><strong>Gift Certificates:</strong> If you're not sure what book to buy for a friend or family member, consider giving them a gift certificate to our store. They can use it to purchase any book in our inventory.</li>
                    <li><strong>Book Club:</strong> We host a monthly book club for readers to discuss a selected book. It's a great way to connect with other readers and discover new books.</li>
                    <li><strong>Book Signing:</strong> We occasionally host book signings with local authors. It's a great opportunity to meet the author and get a signed copy of their book.</li>
                </ul>
                <h2>Our Guarantee</h2>
                <p>At our book store, we're committed to providing the best possible service to our customers. That's why we offer a satisfaction guarantee. If for any reason you're not satisfied with your purchase, we'll do everything we can to make it right.</p>
            </section>
            <Footer/>
        </div>
    );
}
    
export default Services;
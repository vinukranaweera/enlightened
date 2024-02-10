import "./index.css";
import Header from "./Header";
import Footer from "./Footer";

function About() {
    return (
        <div>
            <Header/>
            <section className="footer-links-container">
            <h2>Who We Are</h2>
            <p>
                Book Store is a family-owned and operated business that has been
                serving book lovers for a long time. We are passionate about books
                and believe in the power of reading to inspire and educate.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is to provide a wide selection of books at affordable
                prices, along with exceptional customer service. We want to make it
                easy and enjoyable for people of all ages to discover new books and
                authors, and to connect with others who share their love of reading.
            </p>
            <h2>Our Team</h2>
            <p>
                Our team consists of knowledgeable and friendly staff who are
                dedicated to helping you find the perfect book. Whether you need a
                recommendation for your next read or assistance with a special
                order, we are here to help.
            </p>
            <h2>Our Selection</h2>
            <p>
                We offer a wide variety of books for all ages and interests,
                including bestsellers, classics, children's books, cookbooks, and
                more. We also carry a selection of gifts and stationery items, such
                as bookmarks, journals, and greeting cards.
            </p>
            <h2>Our Community</h2>
            <p>
                We believe that books have the power to bring people together and
                build community. That's why we host regular events such as author
                readings, book clubs, and writing workshops. We also partner with
                local schools and organizations to promote literacy and education.
            </p>
            </section>
            <Footer/>
        </div>
    );
}
    
export default About;
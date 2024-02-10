import { useState, useEffect } from "react";
import BookList from "./BookList";
import Header from "./Header";
import Footer from "./Footer";

interface Book {id: string; name: string; author: string; price: number; image: string;}

function App() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{"logged_in": false}');

  if (!userInfo['logged_in']) {
    window.location.href = "/login";
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/home", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error);
        }
        const data = await response.json();
        setBooks(data);
        setError("");
      } catch (error: any) {
        setError(error.message);
        setBooks([]);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div>
      <Header />
      <h1>Popular Books</h1>
      <div className="search-error">{error && (<p className="error-msg">&#x26A0; &nbsp;{error}</p>)}</div>
      <div className="book">{books.map((book) => (<BookList key={book.id} book={book} />))}</div> 
      <Footer/>
    </div>
  );
}

export default App;

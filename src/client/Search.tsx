import { useState } from "react";
import BookList from "./BookList";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

interface Book {id: string; name: string; author: string; price: number; image: string;}

function Search() {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{"logged_in": false}');

  if (!userInfo['logged_in']) {
    window.location.href = "/login";
  }
  
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
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
  };

  return (
    <div>
      <Header />
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-box">
          <input type="text" placeholder="Search by Author or Title" className="search-input" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
          <button className="search-button" type="submit">Search</button>
        </div>
      </form>
      <div className="search-error">
        {error && <p className="error-msg">&#x26A0; &nbsp;{error}</p>}
      </div>
      <div className="book"> {books.map((book) => (<BookList key={book.id} book={book} />))}</div>
      <Footer/>
    </div>
  );
}

export default Search;
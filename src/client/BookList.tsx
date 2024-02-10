interface Book {id: string; name: string; author: string; price: number; image: string;}

const addToCart = (book: Book) => {
    const cartItems: Record<string, any> = JSON.parse(sessionStorage.getItem("cartItems") || "{}");

    if (book.id in cartItems) {
        cartItems[book.id].qty += 1;
    } else {
        cartItems[book.id] = {'name': book.name, 'price': book.price, 'qty': 1};
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
};

function BookList(props: { book: Book }) {
    const { book } = props;
    return (
        <div className="book-container">
            <div className="book-image"><img src={book.image} alt="Book Image" /></div>
            <div className="book-details">
                <h2 className="book-title">{book.name}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-price">${book.price.toFixed(2)}</p>
            </div>
            <div className="book-button">
                <button onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default BookList;
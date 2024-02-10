import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import { MongoClient, ObjectId } from "mongodb"; 

const app = express();
const uri = "mongodb+srv://chanziming2017:tooeasy@cluster0.cd8i46q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const book_collection = "books";    //can also use collection "Book"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await client.connect();
    const db = client.db("Book_Data");
    const collection = db.collection("user");

    // Check if username or email already exists
    const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: "Username or email already exists" });
    }

    // Insert user into database
    await collection.insertOne({ username, password, email });
    console.log("User Register successful");
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await client.connect();
    const db = client.db("Book_Data");
    const collection = db.collection("user");
    const user = await collection.findOne({ username, password });

    if (user) {
      console.log("User Login successful");
      res.status(200).send("User Login successful");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: "Please provide a search query" });
  }
  try {
    await client.connect();
    const db = client.db("Book_Data");
    const collection = db.collection(book_collection);
    const projection: Record<string, any> = { _id: 1, image: 1, name: 1, author: 1, price: 1, isbn: 1, category: 1 };
    const books = await collection.find({ 
      $or: [
        { author: { $regex: `.*${query}.*`, $options: 'i' } },
        { name: { $regex: `.*${query}.*`, $options: 'i' } }
      ]
    }, projection).limit(10).toArray();
    
    if (books.length > 0) {
      const booksToDisplay = books.map(book => ({
        id: book._id,
        image: book.image,
        name: book.name,
        author: book.author,
        price: book.price,
        isbn: book.isbn,
        category: book.category
      }));
      res.status(200).send(booksToDisplay);
    } else {
      return res.status(404).json({ error: "No books found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/api/home", async (_req, res) => {
  try {
    await client.connect();
    const db = client.db("Book_Data");
    const collection = db.collection(book_collection); 

    // defined top books
    const topbks = ['64647509635c61a7a193cc52', '64647509635c61a7a193cc37', '64647509635c61a7a193cc5b', '64647509635c61a7a193cc72', '64647509635c61a7a193cc33', '64647509635c61a7a193cc8f', '64647509635c61a7a193cc85', '64647509635c61a7a193cc74', '64647509635c61a7a193ccdc'];

    // Convert string IDs to ObjectId type
    const objectIds = topbks.map((id) => new ObjectId(id));

    // Define the aggregation pipeline
    const pipeline = [{ $match: { _id: { $in: objectIds }}}];

    // Execute the aggregation pipeline
    const titles = await collection.aggregate(pipeline).toArray();
    // for random book display
    // const titles = await collection.aggregate([{ $sample: { size: 10 } }, { $project: { _id: 1, image: 1, name: 1, author: 1, price: 1, isbn:1, category: 1 } },]).toArray();
    
    if (titles.length > 0) {
      const booksToDisplay = titles.map(book => ({
        id: book._id,
        image: book.image,
        name: book.name,
        author: book.author,
        price: book.price,
        isbn: book.isbn,
        category: book.category
      }));
      res.status(200).send(JSON.stringify(booksToDisplay));
    } else {
      return res.status(404).json({ error: "No books found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

app.post("/api/order", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("Book_Data");
    const collection = db.collection("orders");

    // Check if username or email already exists
    // Insert user into database
    await collection.insertOne(req.body);
    console.log("Order processed successful");
    return res.status(200).json({ message: "Order processed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
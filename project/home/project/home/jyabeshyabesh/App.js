// Importing necessary modules and components from React
import React, { useState } from "react";
import "./App.css"; // Importing CSS for styling
import BookCard from "./BookCard"; // Importing the component to display individual books

function App() {
  // React state variables
  const [bookTitle, setBookTitle] = useState(""); // Stores the user's input (book title)
  const [books, setBooks] = useState([]); // Stores the list of fetched books
  const [searched, setSearched] = useState(false); // Tracks if a search has been made
  const [loading, setLoading] = useState(false); // Indicates if data is loading
  const [error, setError] = useState(""); // Stores error messages

  // Function to fetch books from the Open Library API
  const fetchBooks = async () => {
    // If input is empty, alert the user
    if (!bookTitle.trim()) {
      alert("Please enter a book title!");
      return;
    }

    // Reset previous error and start loading
    setError("");
    setLoading(true);
    setSearched(false);

    try {
      // Fetch data from Open Library API based on user input
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${bookTitle}`
      );

      // If the response is not successful, throw an error
      if (!response.ok) throw new Error("Network response was not ok");

      // Convert response to JSON
      const data = await response.json();

      // If books are found, display the top 10
      if (data.docs && data.docs.length > 0) {
        setBooks(data.docs.slice(0, 10));
      } else {
        // If no books are found
        setBooks([]);
        setError("No books found. Try another title.");
      }
    } catch (error) {
      // Catch any errors and display a friendly message
      console.error("Error fetching books:", error);
      setBooks([]);
      setError("⚠️ Unable to fetch data. Please check your connection.");
    } finally {
      // Stop loading and mark that a search was made
      setLoading(false);
      setSearched(true);
    }
  };

  // Allows searching by pressing the Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchBooks();
    }
  };

  return (
    <div className="App">
      {/* Application heading */}
      <h1>📚 Book Finder</h1>

      {/* Input field and search button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter book title..."
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchBooks}>Search</button>
      </div>

      {/* Loading message while data is being fetched */}
      {loading && <p className="loading">🔄 Searching for books...</p>}

      {/* Error message if something goes wrong */}
      {error && <p className="error">{error}</p>}

      {/* Display search results only when books are available */}
      {!loading && searched && books.length > 0 && (
        <div className="book-list">
          {/* Mapping through each book and displaying it with BookCard */}
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

// Exporting the App component so it can be used in index.js
export default App;

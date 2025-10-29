import React from "react";
import "./BookCard.css";

function BookCard({ book }) {
  // Get cover image if available
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/120x170?text=No+Image";

  // Construct book details link
  const detailsUrl = `https://openlibrary.org${book.key}`;

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
      <p className="author">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p>
        <strong>First Published:</strong> {book.first_publish_year || "N/A"}
      </p>

      {/* ✅ View Details link */}
      <a
        href={detailsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="view-link"
      >
        🔍 View Details
      </a>
    </div>
  );
}

export default BookCard;

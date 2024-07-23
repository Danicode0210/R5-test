import React from 'react';
import './BookList.css';
import { BookListProps } from '../../types/book';



const formatPrice = (amount: number, currencyCode: string) => {
  if (currencyCode === 'COP') {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
  }
  return amount;
};

const BookList: React.FC<BookListProps> = ({ books, showDetails = true, showFavorites = true, onBookClick }) => {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p className="no-books">No books found</p>
      ) : (
        books.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => onBookClick && onBookClick(book.id)} 
          >
            {book.volumeInfo.imageLinks?.thumbnail && (
              <div className="book-image-wrapper">
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="book-image"
                />
              </div>
            )}
            <div className="book-info">
              <h3 className="book-title">{book.volumeInfo.title}</h3>
              {book.saleInfo?.listPrice && (
                <p className="book-price">
                  Price: {formatPrice(book.saleInfo.listPrice.amount, book.saleInfo.listPrice.currencyCode)}
                </p>
              )}
              {showDetails && <button className="details-button">More Details</button>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;

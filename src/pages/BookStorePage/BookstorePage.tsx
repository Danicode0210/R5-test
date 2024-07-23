import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchGoogleBooks } from '../../services/googleBooksApi';
import BookList from '../../components/BooksList/BookList';
import SearchInput from '../../components/SearchInput/SearchInput';
import Swal from 'sweetalert2';
import './BookstorePage.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};

const BookstorePage: React.FC = () => {
  const query = useQuery();
  const bookId = query.get('bookId') || '';
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const results = await searchGoogleBooks();
        setBooks(results);
        setFilteredBooks(results);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (bookId) {
      const book = filteredBooks.find(b => b.id === bookId);
      setSelectedBook(book);

      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const bookComment = savedComments.filter((c: any) => c.bookId === bookId);
      setComments(bookComment);
    }
  }, [bookId, filteredBooks]);

  const handleCloseModal = () => {
    setSelectedBook(null);
    window.history.pushState({}, '', '/bookstore');
  };

  const handleAddToFavorites = () => {
    if (selectedBook) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.some((book: any) => book.id === selectedBook.id)) {
        favorites.push(selectedBook);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        Swal.fire({
          icon: 'success',
          title: 'Added to Favorites',
          text: 'This book has been added to your favorites!',
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Already in Favorites',
          text: 'This book is already in your favorites!',
        });
      }
    }
  };

  const handleSaveComment = (comment: string) => {
    if (selectedBook) {
      const savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const newComment = { bookId: selectedBook.id, comment };
      savedComments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(savedComments));
      setComments([...comments, newComment]);
    }
  };

  const handlePublishComment = () => {
    if (comment.trim()) {
      handleSaveComment(comment);
      setComment('');
    }
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setFilteredBooks(books);
      return;
    }
    setLoading(true);
    try {
      const results = await searchGoogleBooks(query);
      setFilteredBooks(results);
    } catch (error) {
      console.error("Error searching books:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bookstore-page">
      <h1 >Bookstore</h1>
      <div>
        <SearchInput onSearch={handleSearch} />
      </div>
      {loading ? <p>Loading...</p> : (
        <BookList
          books={filteredBooks}
          showDetails={true}
          showFavorites={true}
          onBookClick={(id) => {
            window.history.pushState({}, '', `/bookstore?bookId=${id}`);
            const book = filteredBooks.find(b => b.id === id);
            setSelectedBook(book);
          }}
        />
      )}
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedBook.volumeInfo.title}</h2>
            <img src={selectedBook.volumeInfo.imageLinks?.thumbnail} alt={selectedBook.volumeInfo.title} />
            <p>{truncateDescription(selectedBook.volumeInfo.description, 50)}</p>
            <button onClick={handleAddToFavorites} className="star-button">
              ★ Add to Favorites
            </button>
            <textarea 
              placeholder="Write a comment..." 
              value={comment}
              onChange={(e) => setComment(e.target.value)} 
            />
            <div>
              <button onClick={handlePublishComment}>Publish</button>
            </div>
            <div className="comments-section">
              <h3>Comments</h3>
              {comments.map((c, index) => (
                <p key={index}>{c.comment}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookstorePage;

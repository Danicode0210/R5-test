import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchGoogleBooks } from '../../services/googleBooksApi';
import BookList from '../../components/BooksList/BookList';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const results = await searchGoogleBooks();
      setBooks(results);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleBookClick = (bookId: string) => {
    navigate(`/bookstore?bookId=${bookId}`);
  };

  return (
    <div className='home-page'>
      <h1>API GOOGLE BOOKS</h1>
      {loading ? <p>Loading...</p> : (
        <BookList
          books={books}
          showDetails={true}
          showFavorites={false}
          onBookClick={handleBookClick}
        />
      )}
    </div>
  );
};

export default HomePage;

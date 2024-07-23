import React, { useState } from 'react';
import { BookDetailProps } from '../../types/book'; 

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const addToFavorites = () => {
    const bookId = book.id || 'defaultId'; 
    setFavorites(prevFavorites => {
      const updatedFavorites = [...prevFavorites, bookId];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedComment = e.target.value;
    setComment(updatedComment);
    localStorage.setItem(`comment_${book.id || 'defaultId'}`, updatedComment);
  };

  return (
    <div>
      <h2>{book.volumeInfo?.title || 'No Title Available'}</h2>
      <button onClick={addToFavorites}>Add to Favorites</button>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a comment..."
      ></textarea>
    </div>
  );
};

export default BookDetail;

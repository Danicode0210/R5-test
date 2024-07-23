import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BookDetail from './BookDetail'; 


const bookMock = {
  id: 'SqikDwAAQBAJ',
  volumeInfo: {
    title: 'JavaScript - Aprende a programar en el lenguaje de la web',
    authors: ["Fernando Luna"],
    publishedDate: "2019-07-23",
    imageLinks: {
      smallThumbnail: "http://books.google.com/books/content?id=SqikDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail: "http://books.google.com/books/content?id=SqikDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
  }
};

describe('BookDetail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders book details and handles favorites and comments', async () => {
    render(<BookDetail book={bookMock} />);

    expect(screen.getByText('JavaScript - Aprende a programar en el lenguaje de la web')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add to Favorites'));

    await waitFor(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      expect(favorites).toContain(bookMock.id);
    });

    const commentText = 'Este es un comentario';
    fireEvent.change(screen.getByPlaceholderText('Write a comment...'), {
      target: { value: commentText }
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Write a comment...')).toHaveValue(commentText);
    });

    await waitFor(() => {
      const storedComment = localStorage.getItem(`comment_${bookMock.id}`);
      expect(storedComment).toBe(commentText);
    });
  });

  test('handles default book title when book data is incomplete', () => {
    render(<BookDetail book={{ id: 'defaultId', volumeInfo: { title: 'No Title Available' } }} />);

    expect(screen.getByText('No Title Available')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import BookList from './BookList';
import { BookListProps } from '../../types/book';

const mockBooks = [
  {
    id: '1',
    volumeInfo: {
      title: 'Book One',
      authors: ['Author One'],
      imageLinks: { thumbnail: 'link_to_thumbnail_1' },
      description: 'Description of Book One',
    },
    saleInfo: {
      listPrice: { amount: 100, currencyCode: 'USD' },
    },
  },
  {
    id: '2',
    volumeInfo: {
      title: 'Book Two',
      authors: ['Author Two'],
      imageLinks: { thumbnail: 'link_to_thumbnail_2' },
      description: 'Description of Book Two',
    },
    saleInfo: {
      listPrice: { amount: 200, currencyCode: 'USD' },
    },
  },
];

const setup = (props: Partial<BookListProps> = {}) => {
  const defaultProps: BookListProps = {
    books: mockBooks,
    showDetails: true,
    showFavorites: true,
    onBookClick: jest.fn(),
    ...props,
  };
  return render(<BookList {...defaultProps} />);
};

describe('BookList Component', () => {
  test('renders books and handles book click', () => {
    const onBookClick = jest.fn();
    setup({ onBookClick });

    mockBooks.forEach(book => {
      expect(screen.getByText(book.volumeInfo.title)).toBeInTheDocument();
    });

    const bookCards = screen.getAllByRole('button');
    bookCards.forEach((card, index) => {
      fireEvent.click(card);
      expect(onBookClick).toHaveBeenCalledWith(mockBooks[index].id);
    });
  });

  test('shows "No books found" message when there are no books', () => {
    setup({ books: [] });
    expect(screen.getByText('No books found')).toBeInTheDocument();
  });

  test('formats and displays book prices correctly', () => {
    setup();
    mockBooks.forEach(book => {
      if (book.saleInfo?.listPrice) {
        const priceText = `Price: $${book.saleInfo.listPrice.amount}`;
        const bookCard = screen.getByText(book.volumeInfo.title).closest('.book-card') as HTMLElement;
        if (bookCard) {
          expect(within(bookCard).getByText((content, element) => {
            const hasText = (text: string) => element?.textContent?.includes(text) ?? false;
            return hasText(priceText);
          })).toBeInTheDocument();
        } else {
          throw new Error('Book card not found');
        }
      }
    });
  });
});

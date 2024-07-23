import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './SearchInput';
import { SearchInputProps } from '../../types/book';

describe('SearchInput Component', () => {
  const setup = (props: Partial<SearchInputProps> = {}) => {
    const defaultProps: SearchInputProps = {
      onSearch: jest.fn(),
      ...props,
    };
    return render(<SearchInput {...defaultProps} />);
  };

  test('renders input and button', () => {
    setup();

    expect(screen.getByPlaceholderText('Search for books...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onSearch when input value changes', () => {
    const onSearch = jest.fn();
    setup({ onSearch });

    const input = screen.getByPlaceholderText('Search for books...');
    fireEvent.change(input, { target: { value: 'JavaScript' } });

    expect(onSearch).toHaveBeenCalledWith('JavaScript');
  });

  test('calls onSearch when search button is clicked', () => {
    const onSearch = jest.fn();
    setup({ onSearch });

    const input = screen.getByPlaceholderText('Search for books...');
    fireEvent.change(input, { target: { value: 'React' } });

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('React');
  });
});

import React, { useState } from 'react';
import './SearchInput.css';
import { SearchInputProps } from '../../types/book';


const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
  return (
    <div className="search-bar-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for books..."
        />
        <button type="button" onClick={() => onSearch(query)}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

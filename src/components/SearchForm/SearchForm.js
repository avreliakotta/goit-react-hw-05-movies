import { useState } from 'react';
import css from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className={css.FormSearch}>
      <input
        type="text"
        onChange={e => setQuery(e.target.value)}
        value={query}
        className={css.searchInput}
      />
      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
};

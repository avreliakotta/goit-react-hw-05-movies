// import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import css from './SearchForm.module.css';
// export const SearchForm = ({ onSubmit }) => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const query = searchParams.get('query' ?? '');

//   const handleSubmit = event => {
//     event.preventDefault();
//     onSubmit(query);
//   };
//   const handleChange = event => {
//     const value = event.target.value;
//     if (value === '') {
//       setSearchParams({});
//     }
//     setSearchParams({ query: value });
//   };

//   return (
//     <form onSubmit={handleSubmit} className={css.FormSearch}>
//       <input
//         type="text"
//         onChange={handleChange}
//         value={query || ''}
//         className={css.searchInput}
//       />
//       <button type="submit" className={css.searchButton}>
//         Search
//       </button>
//     </form>
//   );
// };
// import { useState } from 'react';
// import css from './SearchForm.module.css';

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

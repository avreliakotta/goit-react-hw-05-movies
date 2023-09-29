import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import css from './Movies.module.css';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const query = searchParams.get('query' ?? '');

  const fetchSearchMovies = useCallback(() => {
    const URL = 'https://api.themoviedb.org/3/search/movie';
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTU3NDZiZDFhN2VhZDc4YjNiZmQ5MDRhZTAwMDRhNCIsInN1YiI6IjY1MGM2YWI2MmM2YjdiMDBjNGZkZmYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DX99mnnx3ecqx74al80fvW6EsnGicUU6ObIsdIfAqC4',
      },
    };
    const url = `${URL}?query=${query}`;
    return fetch(url, options).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Not found movies'));
    });
  }, [query]);

  useEffect(() => {
    query &&
      fetchSearchMovies(query)
        .then(data => {
          setSearchMovies(data.results);
        })
        .catch(error => console.log(error.message));
  }, [fetchSearchMovies, query]);

  const visibleMovies =
    searchMovies &&
    searchMovies.filter(
      movie => movie && movie.title.toLowerCase().includes(query.toLowerCase())
    );

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />

      <ul className={css.visibleList}>
        {visibleMovies &&
          visibleMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Movies;

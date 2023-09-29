import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import css from './Movies.module.css';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);

  // const [submitted, setSubmitted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  // console.log('moviesLocation', location);

  const query = searchParams.get('query' ?? '');
  const ref = useRef(query);

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
    ref.current &&
      fetchSearchMovies(ref.current)
        .then(data => {
          console.log('data', data);
          setSearchMovies(data.results);
        })
        .catch(error => console.log(error.message));
  }, [fetchSearchMovies]);

  const visibleMovies =
    searchMovies &&
    searchMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

  const handleSubmit = value => {
    // setSubmitted(true);
    setSearchParams({ query: value });
  };

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {/* {submitted && ( */}
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
      {/* )} */}
    </>
  );
};

export default Movies;

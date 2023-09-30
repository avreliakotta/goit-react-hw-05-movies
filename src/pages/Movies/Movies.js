import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import css from './Movies.module.css';
import { fetchSearchMovies } from '../../servises/moviesApi';
import { MoviesList } from 'components/MoviesList/MoviesList';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query' ?? '');

  useEffect(() => {
    query &&
      fetchSearchMovies(query)
        .then(data => {
          setSearchMovies(data.results);
        })
        .catch(error => console.log(error.message));
  }, [query]);

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
            <MoviesList key={movie.id} movie={movie} basePath="" />
          ))}
      </ul>
    </>
  );
};

export default Movies;

import { useState, useEffect } from 'react';
import { fetchMovies } from '../../servises/moviesApi';
import css from './Home.module.css';
import { MoviesList } from 'components/MoviesList/MoviesList';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies()
      .then(data => {
        setTrendingMovies(data.results);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);
  return (
    <>
      <h1 className={css.homeTitle}>Trending today</h1>
      {error && <div>Not found any movies</div>}
      <ul className={css.trendingList}>
        {trendingMovies &&
          trendingMovies.map(movie => {
            return (
              <MoviesList key={movie.id} movie={movie} basePath="movies" />
            );
          })}
      </ul>
    </>
  );
};
export default Home;

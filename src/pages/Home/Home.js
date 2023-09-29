import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovies } from '../../servises/moviesApi';
import css from './Home.module.css';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchMovies()
      .then(data => {
        // console.log(data);
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
              <li key={movie.id}>
                <Link to={`movies/${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default Home;

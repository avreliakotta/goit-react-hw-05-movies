import { Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useRef } from 'react';

import css from './Movie.module.css';
const MovieDetails = () => {
  const { movieId } = useParams();

  const location = useLocation();
  console.log('locationDetails', location);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const backLinLocationkRef = useRef(location.state?.from ?? '/');
  console.log(location);
  console.log('backLinLocationkRef', backLinLocationkRef);

  const fetchMovieDetails = useCallback(() => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTU3NDZiZDFhN2VhZDc4YjNiZmQ5MDRhZTAwMDRhNCIsInN1YiI6IjY1MGM2YWI2MmM2YjdiMDBjNGZkZmYzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DX99mnnx3ecqx74al80fvW6EsnGicUU6ObIsdIfAqC4',
      },
    };
    return fetch(URL, options).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Not found movies'));
    });
  }, [movieId]);

  useEffect(() => {
    if (!movieId) return;
    fetchMovieDetails()
      .then(data => {
        setMovie(data);
      })
      .catch(error => setError(error.message));
  }, [fetchMovieDetails, movieId]);
  if (!movie) {
    return;
  }

  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w342';
  const releaseDate = movie.release_date;
  const dateObj = new Date(releaseDate);
  const year = dateObj.getFullYear();
  const userScore = Math.round((movie.vote_average / 10) * 100);

  return (
    <>
      <div className={css.container}>
        {error && alert('Not found any movie')}

        <div className={css.imageWrrapper}>
          <Link to={backLinLocationkRef.current} className={css.backLink}>
            {'<--'} Go back
          </Link>

          <img
            src={`${BASE_IMAGE_URL}${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>
        <div className={css.content}>
          <h1 className={css.mainTitle}>
            {movie.original_title}({year})
          </h1>
          <p className={css.textScore}>User score: {userScore} %</p>
          <h3 className={css.subtitle}>Overview</h3>
          <p className={css.text}>{movie.overview}</p>
          <h3 className={css.subtitle}>Genres</h3>
          <ul className={css.genresList}>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfoWrapper}>
        <h3 className={css.Infotitle}>Additional information</h3>
        <ul className={css.InfoList}>
          <li>
            <Link to="cast" className={css.InfoLink}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.InfoLink}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default MovieDetails;

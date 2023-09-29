import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  console.log('movieId', movieId);
  const fetchCast = useCallback(() => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
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
    fetchCast()
      .then(data => {
        // console.log('data', data);
        setCast(data.cast);
      })
      .catch(error => setError(error.message));
  }, [fetchCast, movieId]);
  if (!cast) {
    return <div>Loading...</div>;
  }

  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w154';
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  return (
    <div>
      {error && alert('Not found any information')}
      <ul className={css.CastList}>
        {cast.map(item => {
          return (
            <li key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `${BASE_IMAGE_URL}${item.profile_path}`
                    : `${defaultImg}`
                }
                width={154}
                height={231}
                alt={item.name}
              />
              {/* <div className={css.defaultImage}>No Image Available </div> */}
              <div className={css.CastContent}>
                <h3 className={css.castSubtitle}>{item.name} </h3>
                <p className={css.textContent}>
                  Character:
                  <br />
                  <span className={css.infoText}> {item.character}</span>{' '}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Cast;

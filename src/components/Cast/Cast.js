import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import { fetchCast } from '../../servises/moviesApi';
const Cast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  // console.log('movieId', movieId);

  useEffect(() => {
    if (!movieId) return;
    fetchCast(movieId)
      .then(data => {
        // console.log('data', data);
        setCast(data.cast);
      })
      .catch(error => setError(error.message));
  }, [movieId]);
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

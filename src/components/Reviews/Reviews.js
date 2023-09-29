import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import css from './Revievs.module.css';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const fetchReviews = useCallback(() => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;

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
    fetchReviews()
      .then(data => {
        setReviews(data.results);
      })
      .catch(error => setError(error.message));
  }, [fetchReviews, movieId]);

  return (
    <>
      {error && alert('Not found any reviews')}
      <ul className={css.reviewsList}>
        {reviews && reviews.length > 0 ? (
          reviews.map(item => {
            return (
              <li key={item.id}>
                <h3 className={css.ReviewSubtitle}>Author: {item.author}</h3>
                <p>{item.content}</p>
              </li>
            );
          })
        ) : (
          <li>We don't have any reviews for this movie</li>
        )}
      </ul>
    </>
  );
};

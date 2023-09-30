import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Revievs.module.css';
import { fetchReviews } from '../../servises/moviesApi';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    fetchReviews(movieId)
      .then(data => {
        setReviews(data.results);
      })
      .catch(error => console.log(error.message));
  }, [movieId]);

  return (
    <>
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
export default Reviews;

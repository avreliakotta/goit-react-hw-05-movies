import { Link, useLocation } from 'react-router-dom';
export const MoviesList = ({ movie, basePath }) => {
  const location = useLocation();
  return (
    <li>
      <Link
        to={`${basePath ? `${basePath}/` : ''}${movie.id}`}
        state={{ from: location }}
      >
        {movie.title}
      </Link>
    </li>
  );
};

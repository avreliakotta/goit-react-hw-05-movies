import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
export const Layout = () => {
  return (
    <div className={css.Container}>
      <header className={css.header}>
        <nav>
          <ul className={css.moviesList}>
            <li>
              <NavLink to="/" className={css.link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={css.link}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

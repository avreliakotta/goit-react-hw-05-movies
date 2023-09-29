export const fetchMovies = () => {
  const URL = 'https://api.themoviedb.org/3/trending/movie/day';
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
};

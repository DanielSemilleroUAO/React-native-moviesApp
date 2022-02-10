import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '8671ce3aabcac1ba8a70cfc9cc851c03';

// Get popular movies
export const getPopularMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
  // console.log(resp);
  return resp.data.results;
};

// Get popular movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
  // console.log(resp);
  return resp.data.results;
};

// Get popular tv
export const getPopularTV = async () => {
  const resp = await axios.get(
    `${apiUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
  // console.log(resp);
  return resp.data.results;
};

// Get Family movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  // console.log(resp);
  return resp.data.results;
};

// Get movie Detail
export const getMovieDetail = async (id) => {
  const resp = await axios.get(
    `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`,
  );
  return resp.data;
};
// Search movie by keyword
export const getSearchMovies = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?api_key=${apiKey}&query=${query}`,
  );
  return resp.data.results;
};



import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

// --- Review -------------------------------------------------------------------------------------
async function getMovies() {
  const response = await axios.get(API_HOST + "/api/movies");

  console.log(response.data)

  return response.data;
}

async function getMovie(id) {
  const response = await axios.get(API_HOST + `/api/movies/select/${id}`);

  return response.data;
}

// --- Review -------------------------------------------------------------------------------------
async function getReviews() {
  const response = await axios.get(API_HOST + `/api/reviews`);

  return response.data;
}

async function createReview(review) {
  const response = await axios.post(API_HOST + `/api/reviews`, review);

  return response.data;
}

async function updateReview(id, review) {
  const response = await axios.put(API_HOST + `/api/reviews/${id}`, review);

  return response.data;
}

async function removeReview(id) {
  const response = await axios.delete(API_HOST + `/api/reviews/${id}`)

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getMovies, getMovie,
  getReviews, createReview, updateReview, removeReview,
  getUser, removeUser
}
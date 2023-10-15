import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(user_email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { user_email, password } });
  console.log("API Response:", response.data);
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

async function updateUser(id, user) {
  const response = await axios.put(API_HOST + `/api/users/select/${id}`, user);

  return response.data;
}

async function createUser(user) {

  try {
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data;
  } catch (error) {
    console.error("Axios POST request error:", error);
    throw error;
  }
  
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

// --- Session ------------------------------------------------------------------------------------
async function updateSession(id, session) {
  const response = await axios.put(API_HOST + `/api/sessions/${id}`, session);

  return response.data;
}

// --- Ticket -------------------------------------------------------------------------------------
async function createTicket(ticket) {
  const response = await axios.post(API_HOST + "/api/tickets", ticket);

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
  verifyUser, findUser, createUser, updateUser,
  getMovies, getMovie,
  getReviews, createReview, updateReview, removeReview,
  getUser, removeUser,
  updateSession, 
  createTicket
}
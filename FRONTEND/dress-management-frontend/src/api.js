import axios from 'axios';

const API_URL = 'http://65.1.2.232:5000'; // Replace with your backend URL

// Register user
export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);

// Login user
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// Dispatch items
export const dispatchItems = (data, token) =>
  axios.post(`${API_URL}/supplier/dispatch`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get dispatched items
export const getDispatchedItems = (token) =>
  axios.get(`${API_URL}/supplier/dispatched`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Verify dispatch
export const verifyDispatch = (data, token) =>
  axios.post(`${API_URL}/school/verify`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Sell items to students
export const sellItemsToStudent = (data, token) =>
  axios.post(`${API_URL}/school/sell`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get schools
export const getSchools = (token) =>
  axios.get(`${API_URL}/school`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get items for a school
export const getItems = (token) =>
  axios.get(`${API_URL}/api/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get pending dispatches for the school
export const getPendingDispatches = (token) =>
  axios.get(`${API_URL}/school/pending-dispatches`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get student by ID
export const getStudentById = (studentId, token) =>
  axios.get(`${API_URL}/school/student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get student details by ID
export const getStudentDetails = (studentId, token) =>
  axios.get(`${API_URL}/school/student/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get dispatched data for the Head Office
export const getDispatchedData = (token) =>
  axios.get(`${API_URL}/headoffice/dispatched`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get school inventory data for Head Office
export const getSchoolInventory = (schoolId, token) =>
  axios.get(`${API_URL}/headoffice/school-inventory/${schoolId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

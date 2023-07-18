import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_CREATION':
      return { ...state, loading: true };
    case 'REQUEST_SUCCEEDED':
      return { ...state, users: action.payload, loading: false };
    case 'REQUEST_FAILED':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function UsersList() {
  const [{ users, loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/users/getUsers');
        dispatch({ type: 'REQUEST_SUCCEEDED', payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: 'REQUEST_FAILED', payload: error.message });
        console.log(error);
      }
    };
    fetchData();
  });
  return (
    <div>
      <h1> users list:</h1>

      <p>
        <h3> userName: {users.userName}</h3>
      </p>
    </div>
  );
}

export default UsersList;

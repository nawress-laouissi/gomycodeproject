import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_CREATION':
      return { ...state, loading: true };
    case 'REQUEST_SUCCEEDED':
      return { ...state, loading: false };
    case 'REQUEST_FAILED':
      return { ...state, loading: false };
    default:
      return state;
  }
};
function Tests() {
  const [{ users }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/users/getUsers');
        dispatch({ type: 'FETCH_SUCCESFULL', payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1> users list:</h1>

      <p>
        {users?.map((user) => (
          <h3> {user?.userName}</h3>
        ))}
      </p>
    </div>
  );
}

export default Tests;

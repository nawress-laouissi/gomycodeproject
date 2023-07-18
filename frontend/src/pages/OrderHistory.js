import React, { useContext, useEffect, useReducer } from 'react';
import Loading from '../Compnents/Loading';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCEEDED':
      return { ...state, orders: action.payload, loading: false };
    case 'REQUEST_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistory() {
  const navigate = useNavigate();
  const { state } = useContext(Store);

  const { userInfo } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/orders/order/mine', {
          headers: { authorization: `foodie ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCEEDED', payload: data });
      } catch (error) {
        dispatch({ type: 'REQUEST_FAILED', payload: error.message });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div className="history">
      <h1> order history</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p> {error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th> ID</th>
              <th> DATE</th>
              <th> TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;

import React, { useContext, useEffect, useReducer } from 'react';
import Loading from '../Compnents/Loading';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCEEDED':
      return { ...state, loadingPay: false, successfulPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, error: action.payload };
    case 'RESET_PAY':
      return { ...state, loadingPay: false, successfulPay: false };

    default:
      return state;
  }
};
function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order, successfulPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: false,
      order: {},
      error: '',
      successfulPay: false,
      loadingPay: false,
    });
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          { headers: { authorization: `foodie ${userInfo.token}` } }
        );
        dispatch({ type: 'PAY_SUCCEEDED', payload: data });
        console.log(data);
        toast.success(' The order is paid successfully');
      } catch (error) {
        dispatch({ type: 'PAY_FAILED', payload: error.message });
        toast.error(error.message);
      }
    });
  };
  const onError = (error) => {
    toast.error(error.message);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const res = await axios.get(`/api/orders/order/${orderId}`, {
          headers: { authorization: `foodie ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error.message });
      }
    };
    if (!userInfo) {
      return navigate('/signin');
    }
    if (!order._id || successfulPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successfulPay) {
        dispatch({ type: 'RESET_PAY' });
      }
    }
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal', {
        headers: { authorization: `foodie ${userInfo.token}` },
      });
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };
    loadPaypalScript();
  }, [order, userInfo, orderId, navigate, paypalDispatch, successfulPay]);

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="fixing">
      <h1 className="my-3"> Order {orderId}</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-3 cardie">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress?.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress?.address},
                {order.shippingAddress?.city},{' '}
                {order.shippingAddress?.postalCode},
                {order.shippingAddress?.country}
              </Card.Text>
              {order.isDelivered ? (
                <h2> Delivered at {order.deliveredAt}</h2>
              ) : (
                <Alert variant="dark">Not Delivered</Alert>
              )}
            </Card.Body>
          </Card>
          {/* {order.shippingAddress} */}
          <Card>
            <Card.Body>
              <Card.Title> Payment</Card.Title>
              <Card.Text>
                <strong> Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <Alert variant="dark"> paid at {order.paidAt}</Alert>
              ) : (
                <div> Not paid</div>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3 cardie">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems?.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <Col>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{' '}
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`} className="linked">
                            {item.name}
                          </Link>
                        </Col>
                      </Col>
                      <Col md={2}>
                        <span>{item.numOfItems}</span>
                      </Col>
                      <Col md={4}>{item.price} DT</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{order.itemsPrice?.toFixed(2)} DT</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order.shippingPrice?.toFixed(2)} DT</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{order.taxPrice?.toFixed(2)} DT</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice?.toFixed(2)} DT</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <Loading />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <Loading></Loading>}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPage;

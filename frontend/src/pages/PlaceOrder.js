import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import CheckoutSteps from '../Compnents/Steps';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import Loading from '../Compnents/Loading';

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
function PlaceOrder() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartsItems.reduce((a, c) => a + c.numOfItems * c.price, 0)
  );
  cart.shippingPrice = cart.ItemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'REQUEST_CREATION' });
      const { data } = await Axios.post(
        '/api/orders/newOrder',
        {
          orderItems: cart.cartsItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          user: userInfo.user,
        },
        {
          headers: { authorization: `foodie ${userInfo.token}` },
        }
      );
      console.log(data);

      contextDispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'REQUEST_SUCCEEDED' });
      localStorage.removeItem('cartsItems');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILED' });
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);
  return (
    <div>
      <div className="container place-container">
        <CheckoutSteps step1 step2 step3 step4>
          {' '}
        </CheckoutSteps>
        <h1> Order preview </h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>payment</Card.Title>
                <Card.Text>
                  <strong> Method:</strong> {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment" className="editing">
                  {' '}
                  edit
                </Link>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body className="mb-3">
                <Card.Title> Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartsItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <Col>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail"
                            ></img>
                          </Col>
                          <Col>
                            <Link
                              to={`/product/${item._id}`}
                              className="linked"
                            >
                              {' '}
                              {item.name}
                            </Link>
                          </Col>
                        </Col>
                        <Col md={2}>
                          {' '}
                          <span>{item.numOfItems}</span>
                        </Col>
                        <Col md={4}>
                          {' '}
                          <strong>{item.price} DT</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link to="/basket" className="editing">
                  {' '}
                  edit
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>items</Col>
                      <Col>{cart.itemsPrice.toFixed(2)} DT</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup variant="flush">
                    <Row>
                      <Col>Shipping</Col>
                      <Col>{cart.shippingPrice.toFixed(2)} DT</Col>
                    </Row>
                  </ListGroup>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>{cart.taxPrice.toFixed(2)} DT</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Total</strong>
                      </Col>
                      <Col>
                        <strong>{cart.totalPrice.toFixed(2)} DT</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        variant="dark"
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartsItems.length === 0}
                      >
                        Place Order
                      </Button>
                      {loading && <Loading></Loading>}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PlaceOrder;

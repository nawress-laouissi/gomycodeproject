import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Loading from '../Compnents/Loading';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESFULL':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { _id } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get(`/api/products/getOneProduct/${_id}`);
        dispatch({
          type: 'FETCH_SUCCESFULL',
          payload: res.data.product,
        });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error.message });
        console.log(error);
      }
    };
    fetchData();
  }, [_id, dispatch]);
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const itemExists = cart.cartsItems.find((x) => x._id === product._id);
    const numOfItems = itemExists ? itemExists.numOfItems + 1 : 1;
    const { data } = await axios.get(`/api/products/getOneProduct/${_id}`);
    if (data.product.quantity < numOfItems) {
      window.alert(' this product is out of stock');
      return;
    }
    contextDispatch({
      type: 'ADD_TO_CART_ITEM',
      payload: { ...product, numOfItems },
    });
    navigate('/basket');
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div> {error} </div>
      ) : (
        <div className="productpage">
          <Row>
            <Col md={4}>
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              ></img>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>price: {product.price} DT</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col> price</Col>
                        <Col>{product.price} DT</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> status</Col>
                        <Col>
                          {product.quantity > 0 ? (
                            <Badge bg="success">available</Badge>
                          ) : (
                            <Badge bg="danger">unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.quantity > 0 && (
                      <ListGroup.Item>
                        <div>
                          <Button onClick={addToCartHandler} variant="dark">
                            Add to basket
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;

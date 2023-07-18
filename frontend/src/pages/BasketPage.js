import React, { useContext } from 'react';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function BasketPage() {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartsItems },
  } = state;
  const clickHandler = async (item, numOfItems) => {
    const { data } = await axios.get(`/api/products/getOneProduct/${item._id}`);
    if (data.product.quantity < numOfItems) {
      window.alert(' this product is out of stock');
      return;
    }
    contextDispatch({
      type: 'ADD_TO_CART_ITEM',
      payload: { ...item, numOfItems },
    });
  };
  const removeHandler = (item) => {
    contextDispatch({ type: 'REMOVE_ITEM', payload: item });
  };
  const proceedingHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <div>
        <div>
          <title> Shopping Basket</title>
          <Row>
            <Col md={8}>
              {cartsItems.length === 0 ? (
                <p>
                  {' '}
                  your basket is empty.<Link to="/clothes"> Go shopping</Link>
                </p>
              ) : (
                <ListGroup>
                  {cartsItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={4}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          ></img>
                          <Link
                            to={`/product/${item._id}`}
                            style={{ color: 'black' }}
                          >
                            {' '}
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <Button
                            variant="dark"
                            onClick={() =>
                              clickHandler(item, item.numOfItems - 1)
                            }
                            disabled={item.numOfItems === 1}
                          >
                            <i className="fas fa-minus-circle"></i>
                          </Button>{' '}
                          {''}
                          <span>{item.numOfItems}</span> {''}
                          <Button
                            variant="dark"
                            onClick={() =>
                              clickHandler(item, item.numOfItems + 1)
                            }
                            disabled={item.numOfItems === item.quantity}
                          >
                            <i className="fas fa-plus-circle"></i>
                          </Button>
                        </Col>
                        <Col md={3}>
                          {' '}
                          <strong>{item.price} DT</strong>{' '}
                        </Col>
                        <Col>
                          <Button
                            onClick={() => removeHandler(item)}
                            variant="dark"
                          >
                            <i className=" fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>
                        total:{' '}
                        {cartsItems.reduce((a, c) => a + c.numOfItems, 0)}{' '}
                        <br />
                        items :{' '}
                        {cartsItems.reduce(
                          (a, c) => a + c.price * c.numOfItems,
                          0
                        )}
                      </h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          onClick={proceedingHandler}
                          variant="dark"
                          type="button"
                          disabled={cartsItems.length === 0}
                        >
                          {' '}
                          proceed your purchase
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const goedHandler = () => {
    navigate('/editProfile');
  };
  return (
    <div className="container sign-container">
      <h1> user Profile </h1>

      <Card className="mb-3 ">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>username : </strong>{' '}
                </Col>
                <Col> {userInfo.user.userName}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>fullName : </strong>{' '}
                </Col>
                <Col> {cart.shippingAddress.fullName}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col style={{ textAlign: 'left' }}>
                  <strong style={{ marginLeft: '15px' }}> email : </strong>{' '}
                </Col>
                <Col> {userInfo.user.email}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>
                  {' '}
                  <strong>address: </strong>
                </Col>
                <Col style={{ justifyContent: 'center', textAlign: 'center' }}>
                  {' '}
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="mb-3 ">
                <Button variant="dark" onClick={goedHandler}>
                  {' '}
                  edit Profile
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilePage;

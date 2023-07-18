import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from '../Compnents/Steps';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentWay, setPaymentWay] = useState(paymentMethod || 'paypal');
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    contextDispatch({ type: 'SAVE_PAYMENT_WAY', payload: paymentWay });
    localStorage.setItem('paymentMethod', paymentWay);
    navigate('/placeorder');
  };

  return (
    <div>
      <div className="container sign-container">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>

        <h1 className="my-3"> Payment </h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3 container pay-container">
            <Form.Check
              type="radio"
              id="paypal"
              label="paypal"
              value="paypal"
              checked={paymentWay === 'paypal'}
              onChange={(e) => setPaymentWay(e.target.value)}
            />
          </div>
          <div className="mb-3 container pay-container">
            <Form.Check
              type="radio"
              id="stripe"
              label="stripe"
              value="stripe"
              checked={paymentWay === 'stripe'}
              onChange={(e) => setPaymentWay(e.target.value)}
            />
          </div>
          <div className="mb-3 container pay-container">
            <Form.Check
              type="radio"
              id="cash"
              label="cash on delivery"
              value="cash on delivery"
              checked={paymentWay === 'cash'}
              onChange={(e) => setPaymentWay(e.target.value)}
            />
          </div>
          <div className="mb-3 container pay-container">
            <Button variant="dark" type="submit">
              continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PaymentPage;

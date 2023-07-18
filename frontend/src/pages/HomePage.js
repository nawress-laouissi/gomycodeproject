import React, { useContext, useEffect, useReducer } from 'react';
// import { data } from '../Data';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Compnents/Loading';
import Button from 'react-bootstrap/esm/Button';
import { Store } from '../Store';
import product from './ProductPage';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// creating or defining our reducer !
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESFULL':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function HomePage(props) {
  // use the useReducer hook to manage state :)!
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get('/api/products/getProducts');
        dispatch({ type: 'FETCH_SUCCESFULL', payload: res.data.products });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error.message });
      }
    };
    fetchData();
  }, []);
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartsItems },
  } = state;
  const addToCartHandlertwo = async (item) => {
    const itemExists = cartsItems.find((x) => x._id === product._id);
    const numOfItems = itemExists ? itemExists.numOfItems + 1 : 1;
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
  return (
    <div>
      <div className="allProducts">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>{error} </div>
        ) : (
          Object.values(products).map((product) => (
            <div className="oneProduct" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="details">
                <Link to={`/product/${product._id}`} className="linking">
                  <p> {product.description}</p>
                </Link>
                <p>
                  <strong>{product.price} DT</strong>
                </p>
                {product.quantity === 0 ? (
                  <Button variant="light" disabled>
                    {' '}
                    out of stock
                  </Button>
                ) : (
                  <Button
                    onClick={() => addToCartHandlertwo(product)}
                    variant="dark"
                  >
                    {' '}
                    add to basket
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="position">
        <a href="#top">
          <ArrowUpwardIcon className="arrow" />
        </a>
      </div>
    </div>
  );
}

export default HomePage;

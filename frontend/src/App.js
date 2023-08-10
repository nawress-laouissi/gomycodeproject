import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import BasketPage from './pages/BasketPage';
import SigninPage from './pages/SigninPage';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAdressPage from './pages/ShippingAdressPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrder from './pages/PlaceOrder';
import OrderPage from './pages/OrderPage';
import OrderHistory from './pages/OrderHistory';
import ProfilePage from './pages/ProfilePage';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SearchBox from './Compnents/SearchBox';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './Compnents/ProtectedRoute';
import Daschboadpage from './pages/Daschboadpage';
import AdminRoute from './Compnents/AdminRoute';
import UsersList from './pages/UsersList';
import Tests from './pages/Tests';
import HomePrincipal from './pages/HomePrincipal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from './Compnents/Footer';

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    contextDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('cartsItems');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('api/products/categories');
        setCategories(data);
        console.log(data);
      } catch (error) {
        // toast.error(error.message);
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container '
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand> the bow </Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Link to="/clothes" className=" colorful flexing">
                  our collection
                </Link>
                <SearchBox className="searching" />
                <Nav className="me-auto w-100  justify-content-end ">
                  <Link to="/basket" className="nav-link    ">
                    <ShoppingCartIcon> Basket</ShoppingCartIcon>
                    {cart.cartsItems.length > 0 && (
                      <div>
                        <Badge pill bg="danger">
                          {cart.cartsItems.reduce(
                            (a, c) => a + c.numOfItems,
                            0
                          )}
                        </Badge>
                      </div>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.user.userName}
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item> Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderHistory">
                        <NavDropdown.Item> order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.user.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        {sidebarIsOpen && (
          <div
            className={
              sidebarIsOpen
                ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column site-navbar '
                : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
            }
          >
            <Nav className="flex-column text-white w-100 side__bar ">
              <Nav.Item>
                <strong> Categories</strong>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/clothes"
                  className="nav-link color text-white navcollect"
                >
                  {' '}
                  Our collection{' '}
                </Link>
              </Nav.Item>
              {Object.values(categories).map((category) => (
                <Nav.Item key={category}>
                  {' '}
                  <LinkContainer
                    className="nav-link color text-white theCategory"
                    to={{
                      pathname: '/search',
                      search: `?category=${category}`,
                    }}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        )}

        <main>
          <Routes>
            <Route path="/" element={<HomePrincipal />} />
            <Route path="/clothes" element={<HomePage />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Daschboadpage></Daschboadpage>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/userList"
              element={
                <AdminRoute>
                  <UsersList />
                </AdminRoute>
              }
            />
            <Route path="/product/:_id" element={<ProductPage />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {' '}
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/EditProfile" element={<EditProfile />} /> */}
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/shipping" element={<ShippingAdressPage />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />

            <Route path="/payment" element={<PaymentPage />} />

            <Route
              path="/orderHistory"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer classNmae="footer" />
      </div>
    </BrowserRouter>
  );
}

export default App;

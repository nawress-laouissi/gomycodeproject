// import React, { useContext, useReducer, useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/esm/Button';
// import { Store } from '../Store';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true };
//     case 'UPDATE_SUCCESS':
//       return { ...state, loadingUpdate: false };
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false };

//     default:
//       return state;
//   }
// };

// function EditProfile() {
//   const { state, dispatch: contextDispatch } = useContext(Store);

//   const { userInfo } = state;
//   const [userName, setUserName] = useState(userInfo.userUpdated.userName);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
//     loadingUpdate: false,
//   });
//   const editHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         `/api/users/userUpdate/${userInfo.user._id}`,

//         {
//           userName,
//           email,
//           password,
//         }
//       );
//       dispatch({
//         type: 'UPDATE_SUCCESS',
//       });
//       contextDispatch({ type: 'USER_SIGNIN', payload: data });
//       localStorage.setItem('userInfo', JSON.stringify(data));
//       toast.success('User updated successfully');
//     } catch (error) {
//       dispatch({
//         type: 'FETCH_FAIL',
//       });
//       toast.error(error.message);
//     }
//   };
//   return (
//     <div className="container sign-container">
//       <h1 className="my-3"> Edit profile</h1>
//       <Form onSubmit={editHandler}>
//         <Form.Group className="mb-3" controlId="userName">
//           <Form.Label>username</Form.Label>
//           <Form.Control
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email </Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             autoComplete="off"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="ConfirmPassword">
//           <Form.Label> confirm password</Form.Label>
//           <Form.Control
//             autoComplete="off"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </Form.Group>
//         <div className="mb-3">
//           <Button variant="dark" type="submit">
//             {' '}
//             edit
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default EditProfile;

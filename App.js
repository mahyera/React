import Container from 'react-bootstrap/Container';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import AppNavbar from './components/AppNavbar.js';
import Products from './pages/Products.js';
import Logout from './pages/Logout.js';
import AddProduct from './pages/AddProduct.js';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { UserProvider } from './context/UserContext.js';
import 'notyf/notyf.min.css';

export default function App() {
  const [user, setUser] = useState({
    id: localStorage.getItem('userId') || null,
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`http://ec2-3-16-131-196.us-east-2.compute.amazonaws.com/b1/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data && data._id) {
            localStorage.setItem('userId', data._id);
            localStorage.setItem('isAdmin', data.isAdmin);
            setUser({
              id: data._id,
              isAdmin: data.isAdmin
            });
          } else {
            setUser({
              id: null,
              isAdmin: null
            });
          }
        });
    }
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/AddProduct" element={<AddProduct />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}
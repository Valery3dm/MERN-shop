import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <Header />
    <main>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </main>
    <Footer />
    <ToastContainer />
  </>
);

export default App;

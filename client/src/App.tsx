import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

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
  </>
);

export default App;

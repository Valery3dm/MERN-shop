import React from 'react';
import { Container } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <Header />
    <main>
      <Container maxWidth="xl">
        <h1>Welcome to MERN-shop</h1>
      </Container>
    </main>
    <Footer />
  </>
);

export default App;

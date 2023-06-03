import React from 'react';
import { Container } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HamePage';

const App = () => (
  <>
    <Header />
    <main>
      <Container maxWidth="xl">
        <HomePage />
      </Container>
    </main>
    <Footer />
  </>
);

export default App;

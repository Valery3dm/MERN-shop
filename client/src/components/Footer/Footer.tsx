import React from 'react';
import { Box, Container } from '@mui/material';

import styles from './Footer.module.scss';

const Footer = () => (
  <footer>
    <Container>
      <Box className={styles.taC}>MERN-shop &copy; {new Date().getFullYear()}</Box>
    </Container>
  </footer>
);

export default Footer;

import React from 'react';
import { Box, Container } from '@mui/material';

import styles from './Footer.module.scss';

const Footer = () => (
  <footer>
    <Container className={styles.footer_H}>
      <Box className={styles.ta_C}>MERN-shop &copy; {new Date().getFullYear()}</Box>
    </Container>
  </footer>
);

export default Footer;

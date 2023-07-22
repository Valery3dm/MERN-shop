import React from 'react';
import { Container, Typography } from '@mui/material';

import styles from './Footer.module.scss';

const Footer = () => (
  <footer>
    <Container className={styles.footer_H}>
      <Typography className={styles.ta_C}>MERN - Shop &copy; {new Date().getFullYear()}</Typography>
    </Container>
  </footer>
);

export default Footer;

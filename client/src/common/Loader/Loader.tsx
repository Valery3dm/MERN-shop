import { Box, CircularProgress } from '@mui/material';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <Box className={styles.loader}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;

import React from 'react';
import { Button } from '@mui/material';

import styles from './CustomButton.module.scss';

type CustomButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

const CustomButton = ({
  text,
  disabled = false,
  onClick,
}: CustomButtonProps) => (
  <Button
    variant="contained"
    className={styles.btn}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default CustomButton;

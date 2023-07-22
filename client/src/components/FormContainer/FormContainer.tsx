import React from 'react';
import { Container } from '@mui/material';

import { FormContainerProps } from './FormContainer.type';

const FormContainer = ({ children }: FormContainerProps) => {
  return <Container maxWidth="xs">{children}</Container>;
};

export default FormContainer;

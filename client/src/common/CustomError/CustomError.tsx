import { Typography } from '@mui/material';
import { CustomErrorProps } from './CustomError.types';

const CustomError = ({ error }: CustomErrorProps) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    return (
      <div>
        <Typography variant="h4">An error has occurred:</Typography>
        <Typography variant="h5">{errMsg}</Typography>
      </div>
    );
  }

  return <Typography variant="h4">{error.message}</Typography>;
};

export default CustomError;

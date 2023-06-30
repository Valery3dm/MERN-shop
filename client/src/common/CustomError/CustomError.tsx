import Message from '../Message/Message';

import { CustomErrorProps } from './CustomError.types';

const CustomError = ({ error }: CustomErrorProps) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    return (
      <Message severity='error'>{errMsg}</Message>
    );
  }

  return <Message severity='error'>{JSON.stringify(error.message)}</Message>;
};

export default CustomError;

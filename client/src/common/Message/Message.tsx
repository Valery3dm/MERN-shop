import { Alert } from '@mui/material';

import { MessageProps } from './Message.types';

const Message = ({ severity, children }: MessageProps) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default Message;

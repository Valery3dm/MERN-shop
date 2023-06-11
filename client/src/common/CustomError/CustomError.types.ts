import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type CustomErrorProps = {
  error: FetchBaseQueryError | SerializedError;
};

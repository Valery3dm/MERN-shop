export type MessageProps = {
  severity: 'error' | 'warning' | 'info' | 'success';
  children: string | JSX.Element;
};

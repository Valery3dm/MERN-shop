import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Stack, Pagination} from '@mui/material';

type Props = {
  page: number;
  pages: number;
  isAdmin?: boolean;
};

const Paginate = ({page, pages, isAdmin = false}: Props) => {
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (isAdmin) {
      navigate(`/admin/productlist/${value}`);
    } else {
      navigate(`/page/${value}`);
    }
  };

  return (
    <Stack spacing={2} mt={4}>
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default Paginate;

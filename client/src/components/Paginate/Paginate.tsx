import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Stack, Pagination} from '@mui/material';

type Props = {
  page: number;
  pages: number;
  isAdmin?: boolean;
  keyword?: string;
};

const Paginate = ({page, pages, isAdmin = false, keyword = ''}: Props) => {
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (!isAdmin) {
      if (keyword) {
        navigate(`/search/${keyword}/page/${value}`);
      } else {
        navigate(`/page/${value}`);
      }
    } else {
      navigate(`/admin/productlist/${value}`);
    }
  };

  return (
    <Stack spacing={2} mt={4}>
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default Paginate;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, FormControl, Button, Input } from '@mui/material';

import styles from './Search.module.scss';

const Search = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyWord } = useParams();
  const [keyword, setKeyWord] = useState(urlKeyWord || '');

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyWord('');
    } else {
      navigate(`/`);
    }
  };

  return (
    <Box
      noValidate
      className={styles.searchWrapper}
      component="form"
      autoComplete="off"
      onSubmit={onSubmitHandler}
    >
      <FormControl margin="normal" fullWidth>
        <Input
          id="search-input"
          type="text"
          placeholder="Search Products..."
          aria-describedby="search-helper-text"
          className={styles.searchInput}
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        className={styles.searchBtn}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;

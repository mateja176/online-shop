import { Box } from '@material-ui/core';
import { Header } from 'containers';
import React from 'react';
import { hot } from 'react-hot-loader';

function App() {
  return (
    <Box>
      <Header title="Lorem 1psum Dolor Sit Amet 4552 laboris nisi ut aliquip ex ea commodo consequat" />
    </Box>
  );
}

export default hot(module)(App);

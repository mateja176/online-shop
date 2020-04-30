import { Box } from '@material-ui/core';
import { Header, Overview } from 'containers';
import React from 'react';
import { hot } from 'react-hot-loader';

function App() {
  return (
    <Box>
      <Header />
      <Overview />
    </Box>
  );
}

export default hot(module)(App);

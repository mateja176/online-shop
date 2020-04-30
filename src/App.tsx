import { Box } from '@material-ui/core';
import { Description, Header, Overview } from 'containers';
import React from 'react';
import { hot } from 'react-hot-loader';

function App() {
  return (
    <Box>
      <Header />
      <Overview />
      <Description />
    </Box>
  );
}

export default hot(module)(App);

import { Box } from '@material-ui/core';
import { Header } from 'containers';
import React from 'react';
import { hot } from 'react-hot-loader';

function App() {
  return (
    <Box>
      <Header />
    </Box>
  );
}

export default hot(module)(App);

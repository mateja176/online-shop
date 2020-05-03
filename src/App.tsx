import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Description, Header, Overview } from 'containers';
import React from 'react';
import { hot } from 'react-hot-loader';
import { themeOptions } from 'styles';

const theme = createMuiTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Overview />
      <Description />
    </ThemeProvider>
  );
}

export default hot(module)(App);

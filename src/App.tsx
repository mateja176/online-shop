import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Description, Header, Overview } from 'containers';
import React from 'react';
import { hot } from 'react-hot-loader';

function App() {
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: 'rgb(230, 80, 70)',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Overview />
      <Description />
    </ThemeProvider>
  );
}

export default hot(module)(App);

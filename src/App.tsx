import { item } from 'item';
import React from 'react';
import { hot } from 'react-hot-loader';

function App() {
  return (
    <div className="App">
      <pre>{item}</pre>
    </div>
  );
}

export default hot(module)(App);

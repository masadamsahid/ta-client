import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import ApolloProvider from "./ApolloProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {ApolloProvider}
  </React.StrictMode>
);

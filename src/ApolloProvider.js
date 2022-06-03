import React from "react";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";

import {setContext} from "@apollo/client/link/context";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";

import App from "./App";
import store from "./store";
import {theme} from "./theme";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});

const authLink = setContext((req, prevContext) => {
  const token = localStorage.getItem('jwtoken');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </ApolloProvider>
);

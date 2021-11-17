import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  ApolloProvider,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  console.log(response, 'response');
  console.log(operation.getContext(), 'context');
  if (
    operation.getContext().response.headers['x-refresh-token'] &&
    operation.getContext().response.headers['x-refresh-token'] === 'true'
  ) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: response?.data?.userId,
      })
    );
  }
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      // graphQLError.push(extensions.code);
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      if (extensions.code === 'UNAUTHENTICATED') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    });
  if (networkError) console.log(networkError);
});

const client = new ApolloClient({
  link: concat(errorLink, httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

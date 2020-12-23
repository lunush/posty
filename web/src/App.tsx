import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './layout/Layout';
import { AuthProvider } from './utils/auth';

const token = sessionStorage.getItem('twibterToken');

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3456/graphql',
    credentials: 'include',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;

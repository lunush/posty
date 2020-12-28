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
import Settings from './components/Settings';
import Layout from './layout/Layout';
import { AuthProvider } from './utils/auth';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3456/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('postyToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/settings" component={Settings} />
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

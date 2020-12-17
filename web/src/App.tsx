import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './layout/Layout';

const client = new ApolloClient({
  uri: 'http://localhost:3456/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
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
  );
};

export default App;

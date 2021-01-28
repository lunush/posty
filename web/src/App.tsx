import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Layout from "./layout/Layout";
import { AuthProvider } from "./utils/auth";
import { setContext } from "@apollo/client/link/context";
import Post from "./components/Post";
import { MenuProvider } from "react-native-popup-menu";

const httpLink = createHttpLink({
  uri: "http://localhost:3456/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("postyToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
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
        <MenuProvider>
          <Router>
            <Layout>
              <Switch>
                <Route path="/:username/:postId" component={Post} />
                <Route path="/settings" component={Settings} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/:username" component={Profile} />
                <Route path="/" component={Home} />
              </Switch>
            </Layout>
          </Router>
        </MenuProvider>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;

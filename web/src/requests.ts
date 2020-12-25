import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      username
      name
      postBody
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($postBody: String!) {
    createPost(postBody: $postBody)
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $name: String!, $password: String!) {
    register(username: $username, name: $name, password: $password)
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const GET_PROFILE_PICTURE = gql`
  query GetProfilePicture($username: String!) {
    getProfilePicture(username: $username)
  }
`;

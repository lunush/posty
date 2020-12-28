import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      createdAt
      username
      name
      postBody
      likeCount
      likes {
        username
      }
      commentCount
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($postBody: String!) {
    createPost(postBody: $postBody)
  }
`;

export const TOGGLE_POST_LIKE = gql`
  mutation TogglePostLike($postId: ID!) {
    togglePostLike(postId: $postId) {
      likes {
        username
      }
      likeCount
    }
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
    getUser(username: $username) {
      profilePicture
    }
  }
`;

export const GENERATE_NEW_PROFILE_PICTURE = gql`
  mutation GenerateNewProfilePicture {
    generateNewProfilePicture
  }
`;

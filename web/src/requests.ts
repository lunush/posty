import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($username: String) {
    getPosts(username: $username) {
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

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
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
      comments {
        id
        username
        name
        createdAt
        commentBody
        likeCount
        likes {
          username
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($postBody: String!) {
    createPost(postBody: $postBody) {
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
      comments {
        id
        username
        name
        createdAt
        likeCount
        likes {
          username
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
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

export const TOGGLE_COMMENT_LIKE = gql`
  mutation ToggleCommentLike($postId: ID!, $commentId: ID!) {
    toggleCommentLike(postId: $postId, commentId: $commentId) {
      likes {
        username
      }
      likeCount
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $commentBody: String!) {
    createComment(postId: $postId, commentBody: $commentBody) {
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
      comments {
        id
        username
        name
        createdAt
        likeCount
        likes {
          username
        }
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId)
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

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      username
      name
      location
      bio
      profilePicture
      createdAt
    }
  }
`;

export const GENERATE_NEW_PROFILE_PICTURE = gql`
  mutation GenerateNewProfilePicture {
    generateNewProfilePicture
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $username: String
    $name: String
    $bio: String
    $location: String
  ) {
    updateUserProfile(
      username: $username
      name: $name
      bio: $bio
      location: $location
    )
  }
`;

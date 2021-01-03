import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { CREATE_POST, GET_POSTS } from 'src/requests';
import { useCurrentUserData } from 'src/utils/hooks';
import Card from 'src/components/common/Card';
import { color, globalStyles } from 'src/globalStyles';

const initialState = {
  post: '',
  count: 0,
};

const PostsNewPost = () => {
  const [state, setState] = useState(initialState);
  const currentUser = useCurrentUserData();

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: {
      postBody: state.post,
    },
    update(proxy, { data: { createPost } }) {
      const cachedPosts: any = proxy.readQuery({
        query: GET_POSTS,
      });
      const updatedCachedPosts = [createPost, ...cachedPosts.getPosts];
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...cachedPosts,
          getPosts: updatedCachedPosts,
        },
      });
      setState(initialState);
    },
  });

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const {
      nativeEvent: { text },
    } = e;
    setState({ post: text, count: text.length });
  };

  const handleSubmit = () => createPost();

  return (
    <Card>
      <TextInput
        value={state.post}
        onChange={handleChange}
        placeholderTextColor="#555"
        placeholder={`Hey, ${currentUser?.name}! What's on your mind?`}
        multiline
        maxLength={140}
        style={styles.textInput}
      />
      <View style={styles.postBottom}>
        <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>
          {state.count}/140
        </Text>
        {loading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : (
          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            disabled={state.count === 0 ? true : false}
            accessibilityLabel="Submit button"
          >
            <Text style={[globalStyles.smallText, { fontWeight: 'bold' }]}>
              Post
            </Text>
          </Pressable>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    padding: 14,
    marginBottom: 10,
  },
  postBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingVertical: 20,
  },
  textInput: {
    color: color.primary,
    height: '100%',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: color.bgSecondary,
    fontSize: 16,
    marginTop: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: color.border,
    padding: 14,
    borderRadius: 14,
  },
});

export default PostsNewPost;

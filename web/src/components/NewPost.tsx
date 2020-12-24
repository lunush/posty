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

const initialState = {
  post: '',
  count: 0,
};

const NewPost = () => {
  const [state, setState] = useState(initialState);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(proxy, { data: { post } }) {
      const cachedPosts: any = proxy.readQuery({
        query: GET_POSTS,
      });
      const updatedCachedPosts = [post, ...cachedPosts.getPosts];
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...cachedPosts,
          getPosts: { updatedCachedPosts },
        },
      });
      setState(initialState);
    },
    variables: {
      postBody: state.post,
    },
  });

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const {
      nativeEvent: { text },
    } = e;
    setState({ post: text, count: text.length });
  };

  const handleSubmit = () => {
    createPost();
  };

  return (
    <View style={styles.newPostBox}>
      <View style={styles.post}>
        <TextInput
          value={state.post}
          onChange={(e) => handleChange(e)}
          placeholderTextColor="#555"
          placeholder="New Post"
          multiline
          maxLength={140}
          style={styles.textInput}
        />
        <View style={styles.postBottom}>
          <Text style={styles.countText}>{state.count}/140</Text>
          {loading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : (
            <Pressable
              style={styles.button}
              onPress={handleSubmit}
              disabled={state.count === 0 ? true : false}
              accessibilityLabel="Submit button"
            >
              <Text style={styles.text}>Post</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
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
    paddingHorizontal: 10,
    paddingVertical: 28,
  },
  newPostBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    margin: 10,
    borderRadius: 15,
    height: '12rem',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#222',
  },
  textInput: {
    color: '#bbb',
    height: '100%',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#222',
    fontSize: 16,
    marginTop: 10,
    overflow: 'hidden',
  },
  text: { fontWeight: 'bold', color: '#bbb' },
  countText: {
    fontWeight: 'bold',
    color: '#bbb',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
});

export default NewPost;

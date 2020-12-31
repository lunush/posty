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
import { CREATE_COMMENT, GET_POST } from 'src/requests';

const initialState = {
  comment: '',
  count: 0,
};

interface Props {
  post: {
    id: string;
    createdAt: string;
    username: string;
    name: string;
    postBody: string;
    likeCount: number;
    likes: any[];
    commentCount: number;
  };
}

const PostNewComment: React.FC<Props> = ({ post }) => {
  const [state, setState] = useState(initialState);

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    variables: {
      commentBody: state.comment,
      postId: post.id,
    },
    update() {
      setState(initialState);
    },
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          postId: post.id,
        },
      },
    ],
  });

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const {
      nativeEvent: { text },
    } = e;
    setState({ comment: text, count: text.length });
  };

  const handleSubmit = () => createComment();

  return (
    <View style={styles.newCommentBox}>
      <View style={styles.comment}>
        <TextInput
          value={state.comment}
          onChange={(e) => handleChange(e)}
          placeholderTextColor="#555"
          placeholder="What do you thing?"
          multiline
          maxLength={140}
          style={styles.textInput}
        />
        <View style={styles.commentBottom}>
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
              <Text style={styles.text}>Comment</Text>
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
  commentBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 28,
  },
  newCommentBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment: {
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

export default PostNewComment;

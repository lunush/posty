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
import Card from 'src/components/common/Card';
import { color, globalStyles } from 'src/globalStyles';

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
    <Card>
      <TextInput
        value={state.comment}
        onChange={(e) => handleChange(e)}
        placeholderTextColor="#555"
        placeholder="What do you think?"
        multiline
        maxLength={140}
        style={styles.textInput}
      />
      <View style={styles.commentBottom}>
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
              Comment
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
  commentBottom: {
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
    overflow: 'hidden',
  },
  button: {
    backgroundColor: color.border,
    padding: 14,
    borderRadius: 14,
  },
});

export default PostNewComment;

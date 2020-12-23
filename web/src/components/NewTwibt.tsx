import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
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
  twibt: '',
  count: 0,
};

const NewTwibt = () => {
  const [state, setState] = useState(initialState);

  const [createPost] = useMutation(CREATE_POST, {
    update(proxy, { data: { twibt } }) {
      const cachedTwibts: any = proxy.readQuery({
        query: GET_POSTS,
      });
      const updatedCachedTwibts = [twibt, ...cachedTwibts.getPosts];
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...cachedTwibts,
          getPosts: { updatedCachedTwibts },
        },
      });
      setState(initialState);
    },
    variables: {
      postBody: state.twibt,
    },
  });

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const {
      nativeEvent: { text },
    } = e;
    setState({ twibt: text, count: text.length });
  };

  const handleSubmit = () => {
    createPost();
  };

  return (
    <View style={styles.newTwibtBox}>
      <View style={styles.twibt}>
        <TextInput
          value={state.twibt}
          onChange={(e) => handleChange(e)}
          placeholderTextColor="#555"
          placeholder="New Twibt"
          multiline
          maxLength={140}
          style={styles.textInput}
        />
        <View style={styles.twibtBottom}>
          <Text style={styles.countText}>{state.count}/140</Text>
          <Pressable
            style={styles.button}
            onPress={handleSubmit}
            disabled={state.count === 0 ? true : false}
            accessibilityLabel="Submit button"
          >
            <Text style={styles.text}>Twibt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  twibtBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 28,
  },
  newTwibtBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twibt: {
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

export default NewTwibt;

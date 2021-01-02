import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  maxLength?: number;
  hintTextColor?: string;
  title: string;
  [other: string]: any;
}

const StandardTextInput: React.FC<Props> = ({
  maxLength = 128,
  hintTextColor = '#555',
  title,
  ...other
}) => (
  <View style={styles.container}>
    <Text style={{ color: hintTextColor, padding: 2 }}>{title}</Text>
    <TextInput
      style={styles.textInput}
      placeholderTextColor={hintTextColor}
      placeholder={title}
      maxLength={maxLength}
      {...other}
    />
  </View>
);

export default StandardTextInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 4,
  },
  textInput: {
    color: '#bbb',
    height: 40,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#222',
    fontSize: 18,
  },
});

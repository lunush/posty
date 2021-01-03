import { StyleSheet, Text, TextInput, View } from 'react-native';
import { color } from 'src/globalStyles';

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
    color: color.primary,
    height: 40,
    padding: 20,
    borderRadius: 8,
    backgroundColor: color.bgSecondary,
    fontSize: 18,
  },
});

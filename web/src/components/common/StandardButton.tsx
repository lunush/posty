import { IconType } from 'react-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { color } from 'src/globalStyles';

interface Props {
  title?: string | IconType;
  customStyles?: object;
  [other: string]: any;
}

const StandardButton: React.FC<Props> = ({
  title,
  customStyles,
  children,
  ...other
}) => (
  <Pressable
    style={[styles.button, customStyles]}
    accessibilityLabel={`${title} button`}
    {...other}
  >
    {title ? <Text style={styles.title}>{title}</Text> : children}
  </Pressable>
);

export default StandardButton;

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', color: color.primary },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.border,
    padding: 14,
    borderRadius: 8,
  },
});

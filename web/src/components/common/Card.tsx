import { StyleSheet, View } from 'react-native';
import { color, globalStyles } from 'src/globalStyles';

interface Props {
  id?: string;
}

const Card: React.FC<Props> = ({ children, id = 'none' }) => (
  <View key={id} style={[globalStyles.centeredContainer, { width: '100%' }]}>
    <View style={styles.cardInnerContainer}>
      <View style={globalStyles.fullSpace}>{children}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardInnerContainer: {
    padding: 20,
    margin: 10,
    borderRadius: 15,
    height: '13rem',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 300,
    backgroundColor: color.bgSecondary,
  },
});

export default Card;

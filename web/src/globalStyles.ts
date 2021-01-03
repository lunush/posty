import { StyleSheet } from 'react-native';

export const color = {
  primary: '#bbb',
  secondary: '#777',
  bgPrimary: '#111',
  bgSecondary: '#222',
  border: '#333',
  link: 'teal',
  danger: 'red',
};

export const optionsStyles = {
  optionsContainer: {
    backgroundColor: color.bgSecondary,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.border,
  },
  optionText: {
    color: color.primary,
  },
};

export const globalStyles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  fullSpace: {
    height: '100%',
    width: '100%',
  },
  smallText: {
    color: color.primary,
    fontSize: 12,
  },
  mediumText: {
    color: color.primary,
    fontSize: 18,
  },
  bigText: {
    color: color.primary,
    fontSize: 24,
  },
});

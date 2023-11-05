import { StyleSheet } from 'react-native';

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {},
    image: {
      backgroundColor: backgroundColor,
      height: 100,
      marginRight: 10,
      width: 100,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    line: {
      backgroundColor: backgroundColor,
      height: 20,
      marginBottom: 10,
    },
  });

export default getStyles;

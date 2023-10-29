import { StyleSheet } from 'react-native';

const getStyles = (backgroundColor: string) =>
  StyleSheet.create({
    container: {
      gap: 8,
      marginBottom: 16,
      paddingVertical: 10,
    },
    title: {
      backgroundColor: backgroundColor,
      height: 24,
      width: '50%',
    },
    image: {
      backgroundColor: backgroundColor,
      height: 80,
      width: '100%',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    line: {
      backgroundColor: backgroundColor,
      height: 30,
      width: '30%',
    },
  });

export default getStyles;

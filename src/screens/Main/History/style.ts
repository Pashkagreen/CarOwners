import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-between',
  },
  flatContainer: {
    flex: 1,
    marginTop: 16,
    paddingVertical: 64,
    width: '100%',
  },
  scrollContainer: { paddingBottom: 64 },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoBlock: {
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;

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
    backgroundColor: 'white',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 64,
    width: '100%',
    zIndex: 100,
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

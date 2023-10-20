import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatContainer: {
    flex: 1,
    marginTop: 16,
    paddingVertical: 64,
    width: '100%',
  },
  scrollContainer: { paddingBottom: 64 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  background: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;

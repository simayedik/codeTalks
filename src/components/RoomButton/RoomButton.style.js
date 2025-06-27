import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#016147',
    paddingHorizontal: 10,
    paddingBottom: 10,
    margin: 13,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginVertical: 8,
  },
  downView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  downText: {
    color: 'white',
    fontSize: 10,
    fontStyle: 'italic',
  },
  downContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteImage: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default styles;

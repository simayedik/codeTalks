import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(202, 201, 201)',
    borderRadius: 20,
    fontSize: 16,
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default styles
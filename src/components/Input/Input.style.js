import {StyleSheet} from 'react-native';
const base_style = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 6,
    backgroundColor: '#dbd7d7',
  },
  input: {
    paddingHorizontal: 10,
  },
  placeholderColor: 'rgb(105, 104, 104)',
});

export default {
  primary:StyleSheet.create({
    ...base_style,
  }),
  secondary:StyleSheet.create({
    ...base_style,
    input:{
       ...base_style.input,
      color:'#1c1c1c'
    },
    placeholderColor: 'rgb(105, 104, 104)',
  }),

}

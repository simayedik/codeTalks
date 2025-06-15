import {StyleSheet} from 'react-native';

const base_style = StyleSheet.create({
  container: {
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 6,

  },

  text: {
    textAlign: 'center',
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#016147',
    },
    text: {
      ...base_style.text,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#016147',
    },
    text: {
      ...base_style.text,
      color: '#016147',
    },
  }),
};

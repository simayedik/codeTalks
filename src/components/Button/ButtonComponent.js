import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './Button.style';

export default function ButtonComponent({text, onPress,theme='primary'}) {
  return (
    <TouchableOpacity style={styles[theme].container} onPress={onPress}>
      <View style={styles[theme].button_conatiner}>
          <Text  style={styles[theme].text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

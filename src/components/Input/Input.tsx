import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from './Input.style'

export default function Input({value,onChangeText,placeholders,theme='primary'}) {
  return (
    <View style={styles[theme].container}>
      <TextInput
      style={styles[theme].input}
      value = {value}
      onChangeText={onChangeText}
      placeholder={placeholders}
      placeholderTextColor={styles[theme].placeholderColor}
      />
    </View>
  )
}


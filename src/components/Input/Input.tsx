import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import styles from './Input.style'

export default function Input({value,onChangeText,placeholders}) {
  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      value = {value}
      onChangeText={onChangeText}
      placeholder={placeholders}
      />
    </View>
  )
}


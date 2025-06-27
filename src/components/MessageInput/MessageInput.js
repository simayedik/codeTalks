import {View ,TextInput ,Image ,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './MessageInput.style'

export default function MessageInput({text,setText ,onPress}) {
  return (
    <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor={'rgb(76, 76, 76)'}
          style={styles.input}
          multiline
        />
       <TouchableOpacity
       style={styles.button}
       onPress={onPress}>
        <Image style={styles.image} source={require('../../data/send.png')}/>
       </TouchableOpacity>
   
      </View>
  )
}


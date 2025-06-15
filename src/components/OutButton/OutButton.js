import React from 'react';
import {Text, Image,TouchableOpacity, View} from 'react-native';
import styles from './OutButton.style';
import auth from '@react-native-firebase/auth';
export default function OutButton() {
    function handleOut() {
      auth()
        .signOut()
        .then(() => {
          showMessage({
            message: 'Kullanıcı çıkışı gercekleştirildi',
          });
        })
        .catch(() => {
          console.log('hata');
        });
    }
  return (
    <TouchableOpacity style={styles.container} onPress={handleOut}>
       <Image style={styles.image} source={require('../../data/out.png')}/>
    </TouchableOpacity>
  );
}

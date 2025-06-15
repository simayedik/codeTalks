import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './RoomButton.style';
import {format,formatDistance,subDays} from 'date-fns';
import { tr} from 'date-fns/locale'

export default function RoomButtonComponent({item, userName, onPress}) {
  const createdAtDate = new Date(item.createdAt._seconds * 1000);
  // const formattedDate = format(createdAtDate, "dd-MM-yyyy");
  const distance = formatDistance( createdAtDate, new Date(), { locale:tr })


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress({
          roomName: item.id,
          createdBy: item.createdBy,
          date: item.createdAt,
          userName: userName,
        });
      }}>
      <View style={styles.downView}>
        <Text style={styles.downText}>{item.createdBy}</Text>
        <Text style={styles.downText}>{distance}</Text>
      </View>
      <Text style={styles.text}>{item.id}</Text>
   
    </TouchableOpacity>
  );
}

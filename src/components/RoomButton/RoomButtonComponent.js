import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './RoomButton.style';
import {formatDistance} from 'date-fns';
import {tr} from 'date-fns/locale';
import CustomModal from '../Modal/CustomModal';
import ButtonComponent from '../Button';
import {useState} from 'react';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
export default function RoomButtonComponent({item, userName, onPress}) {
  const createdAtDate = new Date(item.createdAt._seconds * 1000);
  const distance = formatDistance(createdAtDate, new Date(), {locale: tr});
  const [isModalVisible, setModalVisible] = useState(false);

  function deleteRoom() {
    let roomId = item.id
    firestore().collection('rooms').doc(roomId).delete()
    .then(() => {
      console.log('Oda başarıyla silindi!');
    })
    .catch((error) => {
      console.error('Oda silme hatası: ', error);
    });
  }

  const handleDeletePress = () => {
    setModalVisible(!isModalVisible); // Silme butonuna tıklandığında modalı göster
  };
  const cancelDelete = () => {
    setModalVisible(false); // Modalı gizle
  };

  return (
    <View>
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
        <View style={styles.downContainer}>
          <Text style={styles.text}>{item.id}</Text>
          {userName == item.createdBy && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletePress}>
              <Image
                style={styles.deleteImage}
                source={require('../../data/garbage.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={cancelDelete}
        onBackdropPress={cancelDelete}
        onBackButtonPress={cancelDelete}>
        <View style={styles.modalContainer}>
          <Text style={{fontSize:18}}>Odayı silmek istediğinizden emin misiniz ?</Text>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <ButtonComponent text={'Evet'} onPress={deleteRoom} />
            <ButtonComponent text={'Hayır'} onPress={cancelDelete} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet ,Text,View} from 'react-native';
import Input from '../Input';
import ButtonComponent from '../Button';

export default function CustomModal({text,setText,isModalVisible,closeModal,buttonOnpress}) {
  
  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.modalContainer}>
         <Input style={styles.input} value={text} onChangeText={setText} placeholders={'Oda Adı ?'} theme='secondary'/>
         <ButtonComponent text={'Oluştur'} onPress={buttonOnpress}/>
      </View>

    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import Input from '../../components/Input';
import CustomModal from '../../components/Modal/CustomModal';
import RoomButtonComponent from '../../components/RoomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [text, setText] = useState();
  const [roomName, setRoomName] = useState();
  const [rooms, setRooms] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (!!user) {
      setUserName(user._user.email.split('@')[0]);
    }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rooms')
      .onSnapshot(snapshot => {
        const roomList = [];
        snapshot.forEach(doc => {
          roomList.push({id: doc.id, ...doc.data()});
        });
        roomList.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        setRooms(roomList);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // cleanup
  }, []);

  function handleChangeText(value) {
    setText(value);
  }
  function handleChangeRoom(value) {
    setRoomName(value);
  }
  const closeModal = () => {
    setModalVisible(false);
  };
  function buttonOnpress() {
    if (!text || !userName) {
      showMessage({
        message: 'Lütfen tüm alanları doldurunuz!!',
        type: 'warning',
      });
      return;
    }

    firestore()
      .collection('data')
      .add({
        name: userName,
        text: text,
        date: new Date(),
      })
      .then(() => {
        showMessage({
          message: 'Başarılı',
          type: 'info',
        });
      })
      .catch(error => {
        showMessage({
          message: error.code,
          type: 'danger',
        });
      });
  }
  function createRoom() {
    if (!roomName) {
      showMessage({message: 'Oda adı boş olamaz', type: 'warning'});
      return;
    }

    firestore()
      .collection('rooms')
      .doc(roomName)
      .set({
        createdAt: new Date(),
        createdBy: userName,
      })
      .then(() => {
        showMessage({message: 'Oda oluşturuldu', type: 'success'});
      })
      .catch(error => {
        showMessage({message: error.message, type: 'danger'});
      });

    setModalVisible(false);
  }
  
  const enterRoom = (item) => {
    console.log(item)
    navigation.navigate('ChatPage', {
      roomName: item.roomName,
      createdBy: item.createdBy,
      date: item.createdAt,
      userName: item.userName, // userName'ı item'dan alıyorsanız
    });
  };



  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
         <RoomButtonComponent item={item} userName={userName} onPress={enterRoom} />
        )}
      />
      <CustomModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        buttonOnpress={createRoom}
        text={text}
        setText={handleChangeRoom}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!isModalVisible);
        }}
        style={styles.plusButton}>
        <Image
          source={require('../../data/plus.png')}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  plusIcon: {
    width: 50,
    height: 50,
    top: 10,
  },
});

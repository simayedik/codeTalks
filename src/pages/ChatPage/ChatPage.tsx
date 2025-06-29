import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import MessageInput from '../../components/MessageInput';
import {format} from 'date-fns';
import {tr} from 'date-fns/locale';
import styles from './ChatPage.style';

export default function ChatPage() {
  const route = useRoute();
  const {roomName, userName} = route.params;
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rooms')
      .doc(roomName)
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const msgs = [];
        snapshot.forEach(doc => msgs.push({id: doc.id, ...doc.data()}));
        setMessages(msgs);
      });

    return () => unsubscribe();
  }, [roomName]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    firestore().collection('rooms').doc(roomName).collection('messages').add({
      sender: userName,
      text: text.trim(),
      timestamp: new Date(),
    });

    setText('');
  };

  const renderItem = ({item}) => {
    const isCurrentUser = item.sender === userName;
    const createdAtDate = new Date(item.timestamp._seconds * 1000);
    const date = format(createdAtDate, 'dd.MM', {locale: tr});

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUser : styles.otherUser,
        ]}>
        {!isCurrentUser && <Text style={styles.senderText}>{item.sender}</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={keyboardHeight}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, {paddingBottom: keyboardHeight}]}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
              onLayout={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
            />
            <View style={{paddingBottom: 5}}>
              <MessageInput text={text} setText={setText} onPress={sendMessage} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

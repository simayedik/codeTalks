import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import HomePage from './pages/HomePage';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import OutButton from './components/OutButton';
import ChatPage from './pages/ChatPage/ChatPage';

const Stack = createNativeStackNavigator();

export default function Router() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser ] = useState();

  function onAuthStateChanged(user) {
    setUser (user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // cleanup
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="home"
              component={HomePage}
              options={{
                title: 'Odalar',
                headerTitleStyle: {
                  color: '#016147',
                },
                headerTitleAlign: 'center',
                headerRight: () => <OutButton />, // Bileşeni burada çağırıyoruz
              }}
            />
            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={
              ({ route }) => ({
                title: route.params.roomName || 'Sohbet',
                headerTitleAlign:'center',
                headerTitleStyle:{
                   color: '#016147',
                },
                headerTintColor:'#016147'
              })
              
            }
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

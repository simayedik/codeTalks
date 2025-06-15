import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth'; 
import {showMessage} from 'react-native-flash-message';

import Input from '../../components/Input';
import ButtonComponent from '../../components/Button';

export default function SignIn({navigation}) {
  const initialValues = {email: '', password: ''};

  function handleSubmit(values) {
    const {email, password} = values;

    if (!email || !password) {
      showMessage({
        message: 'Lütfen tüm alanları doldurunuz',
        type: 'warning',
      });
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        showMessage({
          message: 'Kullanıcı başarıyla giriş yaptı',
          type: 'success',
        });
      })
      .catch(error => {
        let message = 'Bir hata oluştu';
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'Geçersiz e-posta';
            break;
          case 'auth/user-not-found':
            message = 'Kullanıcı bulunamadı';
            break;
          case 'auth/wrong-password':
            message = 'Şifre yanlış';
            break;
          case 'auth/invalid-credential':
            message = 'E-posta veya şifre geçersiz';
            break;
        }

        showMessage({
          message,
          type: 'danger',
        });

        console.log('Firebase Hatası:', error.code);
      });
  }

  function handleRouter() {
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <View>
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              placeholders="Username"
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeholders="Password"
            />
            <ButtonComponent
              text={'Giriş Yap'}
              onPress={() => handleSubmit()}
              theme="primary"
            />
            <ButtonComponent
              text={'Kayıt Ol'}
              onPress={handleRouter}
              theme="secondary"
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Input from '../../components/Input';
import ButtonComponent from '../../components//Button';

export default function SignUp({navigation}) {
  const initialValues = {email: '', password: '', checkPassword: ''};

   

  function handleSubmit(values) {
    const {email, password,checkPassword} = values;
 

    if (!email || !password || !checkPassword) {
      showMessage({
        message: 'Lütfen tüm alanları doldurunuz',
        type: 'warning',
      });
      return;
    } 
    if (password !== checkPassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }
   
   auth()
    .createUserWithEmailAndPassword( email, password)
      .then(() => {
        showMessage({
          message: 'Kullanıcı başarı ile oluşturuldu',
        });
      })
      .catch(error => {
        let message = 'Bir hata oluştu';
        let type = 'danger';

        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'Bu e-posta zaten kullanılmakta';
            type = 'info';
            break;
          case 'auth/invalid-email':
            message = 'Geçersiz e-posta';
            break;
          case 'auth/weak-password':
            message = 'Şifre yeterince güçlü değil';
            break;
        }

        showMessage({message, type});
        console.error(error);
      });
  }

  function handleRouter() {
    navigation.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <View>
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              placeholders="E postanızı giriniz "
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              placeholders="Şifre giriniz"
            />
            <Input
              value={values.checkPassword}
              onChangeText={handleChange('checkPassword')}
              placeholders="Tekrar şifrenizi giriniz"
            />
            <ButtonComponent
              text={'Kayıt Ol'}
              onPress={handleSubmit}
              theme="primary"
            />
            <ButtonComponent
              text={'Giriş Yap'}
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

import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { Error, Input, CustomBtn, Header } from '../components/common';
import { loginSchema } from '../schema';
import firestore from '@react-native-firebase/firestore';
import { customAlphabet } from 'nanoid/non-secure';
import { useNavigation } from '@react-navigation/native';


const LogInScreen = () => {
  const navigation = useNavigation();

  const findUser = (email) => {
    firestore()
      .collection('users')
      .where("email", "==", email.toLowerCase())
      .get()
      .then(res => {
        // console.log(res?.docs[0]?.data())
        navigation.navigate("Chat", { data: res?.docs[0]?.data() })

      })
      .catch((error => console.log("error during getting data from firestore " + error)))
  }

  const createUser = (name, email) => {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 15);
    const userId = nanoid();
    firestore()
      .collection('users')
      .doc(userId).set({
        name: name,
        email: email.toLowerCase(),
        userId: userId,
      }).then(() => {
        //find the user after creating
        findUser(email.toLowerCase());
        // console.log("user created")

      }).catch(error => console.log("error during registering of user" + error))
  }

  const registerUser = ({ name, email }) => {

    firestore()
      .collection('users')
      .where("email", "==", email.toLowerCase())
      .get()
      .then(res => {

        if (res.docs.length === 0) {
          //user is not exists create new one
          createUser(name, email);
        }
        else {
          //user already exists
          // console.log(res?.docs[0].data())
          // console.log("user exists")
          navigation.navigate("Chat", { data: res?.docs[0]?.data() })
        }

      })
      .catch((error => console.log("error during getting data from firestore " + error)))
    // navigation.push("Home")
  }

  const LoginHandle = (value, action) => {
    registerUser(value);
    action.resetForm();
  };

  const initialState = {
    name: '',
    email: ''
  };

  return (
    <Formik
      initialValues={initialState}
      validateOnMount={true}
      validationSchema={loginSchema}
      onSubmit={LoginHandle}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <>
          <Header title={"LOGIN"} leftIcon={true} />
          <View style={styles.mainContainer}>

            <View style={styles.logInform}>
              <Input
                placeholder={'Enter Your Name'}
                customStyle={styles.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && touched.name && <Error message={errors.name} />}
              <Input
                placeholder={'Enter Your Email'}
                customStyle={styles.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email && <Error message={errors.email} />}
            </View>
            <CustomBtn
              customStyle={styles.logInBtn}
              title={'LOGIN'}
              color={'white'}
              onPress={handleSubmit}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logInform: {
    width: '100%'
  },
  logInBtn: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  },
  text: {
    marginTop: 20,
    fontSize: 18
  },
  register: {
    fontWeight: 'bold'
  }
});

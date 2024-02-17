import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { Error, Input, CustomBtn, Header } from '../components/common';
import { loginSchema } from '../schema';

const LogInScreen = () => {

  const handleFormSubmission = async (value, action) => {
    console.log(value);
    action.resetForm()
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
      onSubmit={handleFormSubmission}>
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

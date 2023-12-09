import {Alert, StatusBar,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({

  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your full name.'),
  email: Yup.string().email('Invalid email').required('Please enter your email address.'),
  password:Yup.string()
  .min(8)
  .required('Please enter your password.')
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  'Must contain minimum 8 characters, at least one uppercase letter,one lowercase letter , one number and one special character',
  ),
  confirmPassword:Yup.string()
  .min(8, 'Confirm Password must be 8 chracters long.')
  .oneOf([Yup.ref('password')], 'Your Passwords do not match.')
  .required('Confirm password is required.'),
mobile: Yup.string()
    .min(10,'Must be exactly 10 digits')
    .max(10,'Must be exactly 10 digits')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required('Please enter your mobile number'),


});

const App = () => {
  return (
    <Formik initialValues={{
      name: '',
      email: '',
      password: '',
      confirmPassword:'',
      mobile: '',
    }}
    validationSchema={SignupSchema}
    onSubmit={values => Alert.alert(JSON.stringify(values))} 
    >
      {({values,errors,touched,handleChange,setFieldTouched, isValid,handleSubmit}) =>(

     
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-Content'} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

         <View style={styles.inputWrapper}>
        <TextInput 
        style={styles.inputStyle} 
        placeholder='Full name' 
        values={values.name}
        onChangeText={handleChange('name')}
        onBlur={() => setFieldTouched('name')} 
        
        />
        {touched.name && errors.name && (
          <Text style={styles.errorText}>{errors.name}</Text>
        )}
        </View>
        <View style={styles.inputWrapper}>
        <TextInput 
        style={styles.inputStyle} 
        placeholder='Email Address'
        autoCapitalize={false}
        values={values.email}
        onChangeText={handleChange('email')}
        onBlur={()=> setFieldTouched('email')} 

        />
        {touched.email && errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
        <View style={styles.inputWrapper}>
        <TextInput 
        style={styles.inputStyle} 
        placeholder='Password'
        autoCapitalize={false}
        values={values.password}
        onChangeText={handleChange('password')}
        onBlur={()=> setFieldTouched('password')} 
       
        />
        {touched.password && errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        </View> 
         <View style={styles.inputWrapper}>
        <TextInput 
        style={styles.inputStyle} 
        placeholder='confirmPassword'
        autoCapitalize={false}
        values={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={()=> setFieldTouched('confirmPassword')} 
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
       </View>
       <View style={styles.inputWrapper}>
        <TextInput 
        style={styles.inputStyle} 
        placeholder='Mobile No.'
        keyboardType='phone-pad'
        values={values.mobile}
        onChangeText={handleChange('mobile')}
        onBlur={()=> setFieldTouched('mobile.')} 
        />
        {touched.mobile && errors.mobile && (
          <Text style={styles.errorText}>{errors.mobile}</Text>
        )}
        </View>

        <TouchableOpacity 
        onPress={handleSubmit}
        disabled={!isValid} 
        style={[styles.submitBtn,
          {backgroundColor:isValid ? '#395B64' : '#A5C9CA'}]}
        >
          <Text styles={styles.submitBtnTxt}>Submit</Text>
        </TouchableOpacity>
        </View>
        </View> 
    </View>
     )}
    </Formik>
  );
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#445c5e',
    paddingHorizontal: 15,

  },
  formContainer: {
    backgroundColor:'#F5EDDC',
    padding: 20,
    borderRadius:20,
    width: '100%'
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight:'400',
    marginBottom:15 ,
  },
  inputWrapper:{
    marginBottom:15,
  },
  inputStyle: {
    borderColor: '#162113E',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorText:{
    fontSize:12,
    color:'#FF0D10',
  },
  submitBtn:{
    //backgroundColor: '#395B64',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  submitBtnTxt: {
    color:'fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

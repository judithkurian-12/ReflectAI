// Created by Judith Kurian (B00940475)

import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Styles } from "./LoginStyles";
import { validateEmail, validatePassword } from "../utils/helper";
import ErrorModal from "../components/ErrorModal";
import { resetSignUpError, setCredentials } from "./action";

const SignUp = ({navigation, setCredentials, signUpError, resetSignUpError, user}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(signUpError === '' && user?._id){
            navigation.navigate('MainApp');
        }
        else if(signUpError){
            setMessage(signUpError);
            setError(true);
        }
    }, [signUpError, user]);

    const validate = () =>{
        let validationErrors = [];

        if(!validateEmail(email))
        {
            validationErrors.push("Email must be in the format: xyz@abc.com");
        }
        if(!validatePassword(password))
        {
            validationErrors.push(
                "Password must contain 8 characters with at least one uppercase, one lowercase, one digit, and one special character."
            );
        }
        else if(password !== confirmPassword)
        {
            validationErrors.push("Passwords do not match.");
        }
        if(validationErrors.length>0)
        {
            setMessage(validationErrors.join('\n'));
            setError(true);
        }
        else 
        {
            setError(false);
            setCredentials({email,password})
        }
    }

    const handleModalDismiss = () => {
        setError(false);
        resetSignUpError();
    }

    return (
        <ScrollView keyboardDismissMode="none" style={Styles.scroll} contentContainerStyle={Styles.scrollContainer}>
            <View style={signupStyles.signupView}>
                <Image source={require('../images/logo.png')} style={Styles.logo}/>
                <View style={Styles.loginTextView}>
                    <Text style={Styles.label}>Email</Text>
                    <TextInput style={Styles.loginInput} value={email} onChangeText={(text)=>setEmail(text)} />
                    <Text style={{...Styles.passwordStyle, ...Styles.label}}>Password</Text>
                    <TextInput 
                    style={Styles.loginInput} 
                    value={password} 
                    onChangeText={(text)=>setPassword(text)} 
                    secureTextEntry={true}
                    />
                    <Text style={{...Styles.passwordStyle, ...Styles.label}}>Re-enter Password</Text>
                    <TextInput 
                    style={Styles.loginInput} 
                    value={confirmPassword} 
                    onChangeText={(text)=>setConfirmPassword(text)} 
                    secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={Styles.loginButton} onPress={validate}>
                    <Text style={Styles.buttonText}>Create Account </Text>
                </TouchableOpacity>
            </View>
            {/* Error Modal */}
            <ErrorModal visibility={error} onDismiss={handleModalDismiss} message={message}/>
        </ScrollView>
    )
}

const signupStyles = {
    signupView: {
        width: '85%',
        height: 490,
        borderWidth: 5,
        borderColor: '#f4d03f',
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 60,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 8, // For Android
        // For iOS
        shadowColor: '#000', 
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.9,
    }
}

const mapStateToProps = (state) => ({
    signUpError: state.onboarding?.signUpError, 
    user: state.onboarding?.user
});

const mapDispatchToProps = {setCredentials, resetSignUpError}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
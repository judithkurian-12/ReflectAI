// Created by Judith Kurian (B00940475)

import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Styles } from "./LoginStyles";
import { setLogin, resetLoginError } from "./action";
import ErrorModal from "../components/ErrorModal";

const Login = ({navigation, setLogin, loginSuccess, loginError, resetLoginError}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)

    useEffect(()=>{
        if(loginSuccess===true)
        {
            // sets Calendar page as the first screen in the app
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
            });
        }
        else if(loginError!=='') {
            setError(true);
        }
    },[loginSuccess, loginError])

    const performLogin = () => {
        setLogin({email, password});
    }

    const handleModalDismiss = () => {
        setError(false);
        resetLoginError();
    }

    return (
        <ScrollView keyboardDismissMode="none" style={Styles.scroll} contentContainerStyle={Styles.scrollContainer}>
            <View style={Styles.loginView}>
                <Image source={require('../images/logo.png')} style={Styles.logo}/>
                <View style={Styles.loginTextView}>
                    <Text style={Styles.label}>Email</Text>
                    <TextInput style={Styles.loginInput} value={email} onChangeText={(text)=>setEmail(text)} />
                    <Text style={{...Styles.passwordStyle, ...Styles.label}}>Password</Text>
                    <TextInput style={Styles.loginInput} value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true}/>
                </View>
                <TouchableOpacity style={Styles.loginButton}>
                    <Text style={Styles.buttonText} onPress={performLogin}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.createAccount} onPress={()=>navigation.navigate('Emotional Analysis')}>
                    <Text style={Styles.createAccountText}>Create an account</Text>
                </TouchableOpacity>
            </View>
            {/* Error Modal */}
            <ErrorModal visibility={error} onDismiss={handleModalDismiss} message={loginError}/>
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    loginSuccess: state.onboarding?.loginSuccess,
    loginError: state.onboarding?.loginError 
});

const mapDispatchToProps = {setLogin, resetLoginError}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
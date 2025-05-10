// Created by Judith Kurian (B00940475)

export const Styles = {
    scroll: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    loginView: {
        width: '85%',
        height: 415,
        borderWidth: 5,
        borderColor: '#f4d03f',
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 80,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 10, // For Android
        // For iOS
        shadowColor: '#000', 
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 8,
    },
    logo: {
        width: 70,
        height: 70,
        marginBottom: 25,
    },
    loginTextView: {
        width: '100%',
    },
    loginInput: {
        height: 45,
        marginTop: 5,
        paddingLeft: 10,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#04B2D9',
        color:'#049DD9'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#04B2D9'
    },
    passwordStyle: {
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#0FA644',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 17,
        marginTop: 38,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    createAccount: {
        marginTop:10,
    },
    createAccountText: {
        color: '#049DD9',
        textDecorationLine: 'underline'
    }
}
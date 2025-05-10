// Created by Judith Kurian (B00940475)

export const Styles = {
    scroll: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    containerScroll: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'column',
        flex:1,
        width:'85%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 15, // For Android
        // For iOS
        shadowColor: '#000', 
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
        paddingVertical: 10,
        marginTop: 15,
        marginBottom: 10
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        color: '#F2B84B',
        fontWeight: 'bold',
    },
    heart: {
        height: 20,
        width:30,
        marginTop: 2,
        marginLeft: 2
    },
    questionView: {
        marginHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        width:'100%'
    },
    questionSection: {
        flexDirection: 'row'
    },
    question: {
        fontSize: 18,
        color: '#04B2D9',
        fontWeight: 'bold',
    },
    winky: {
        height: 30,
        width: 30,
        marginLeft: 3
    },
    silent: {
        height: 22,
        width: 31,
        marginLeft: 5,
        marginTop:3
    },
    input: {
        width:'80%',
        height: 40,
        marginTop: 5,
        paddingLeft: 10,
        paddingVertical:9,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#04B2D9',
        color: '#04B2D9',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'silver',
        marginLeft: -25
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#04B2D9',
        marginLeft: -25
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#04B2D9'
    },
    options: {
        color:'#04B2D9'
    },
    hiding: {
        height: 24,
        width: 24,
        marginLeft: 5,
        marginTop:1
    },
    nextButton: {
        backgroundColor: '#0FA644',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 17,
        marginTop: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}
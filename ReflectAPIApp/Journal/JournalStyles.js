export const Styles = {
    mainView: {
        flex: 1
    },
    postButton: {
        flexDirection: 'row',
        backgroundColor: '#0FA644',
        width: '35%',
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        alignSelf: 'flex-end',
        zIndex: 1,
        position: 'absolute',
        top: 20, // Distance from bottom of the screen
        right: 20,  // Distance from right of the screen
    },
    newPost: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 3,
        marginTop: 2,
        color:'black'
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // Ensure the modal overlay is on top
        //revamp
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    containerStyle: {
        alignSelf: 'center',
        width: '90%',
        maxWidth: 500,
        height: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
    },
    scrollStyle: { 
        paddingRight: 10,
        flexGrow: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 15,
        height: 200,
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
        textAlignVertical: 'top',
    },
    mediaView: {
        flexDirection: 'column'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 60
    },
    deleteText: {
        color: '#cb4335',
        marginLeft: 3
    },
    audioButton: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 50,
    },
    iconsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    icon: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f0f4f8',
        width: 80,
    },
    iconImage: {
        fontSize: 20,
        color: '#4a5568',
        marginBottom: 5,
    },
    iconText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4a5568',
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    modalButtons: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        backgroundColor: '#0FA644',
    },
    closeButton: {
        backgroundColor: '#F2B84B',
    },
    modalButtonText: {
        fontSize: 16,
        color:'black',
        fontWeight: '600',
        marginLeft: 8,
    },
    postScroll: {
        zIndex: 0,
        marginTop: 20,
        flex: 1
    },
    mainPostView: {
        margin: 10
    },
    postView: {
        padding: 10,
        backgroundColor: '#2c3e50',
        borderRadius: 10,
        elevation: 5, // For Android
        // For iOS
        shadowColor: '#000', 
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.9,
        shadowRadius: 8
    },
    postText: {
        fontSize: 18,
        marginBottom: 5,
        color: '#F2B84B',
        fontWeight: 'bold'
    },
    dateTime: {
        color: '#a6acaf',
        fontSize: 11,
        marginBottom: 2
    },
    noPosts: {
        color: 'black',
        fontSize: 18,
        marginTop: 15,
        fontWeight: 'bold'
    },
    noPostsView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 500,
    },
    crying: {
        height: 150,
        width: '50%'
    },
    audioContainer: {
        marginVertical: 15,
        backgroundColor: '#f0f4f8',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    audioContainerMain: {
        marginVertical: 15,
        padding: 8,
        backgroundColor: '#797d7f',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: '55%',
    },
    audioLabel: {
        fontWeight: '600',
        color: '#2d3748',
        flex: 1,
    },
    audioControls: {
        marginLeft: 10
    },
}


// Created by Judith Kurian (B00940475)

export const Styles = {
    container: { 
        flex: 1, 
        padding: 20,
    },
    heading: { 
        fontSize: 22,
        marginBottom: 10, 
        color: '#049DD9',
        fontFamily: 'Merriweather_24pt-Bold',
    },
    contentView: {
        marginBottom:40
    },
    quote: { 
        fontSize: 23,
        marginTop: 10,
        color: '#333',
        backgroundColor: '#ffffff', // white card background
        borderRadius: 5,
        padding: 10,
        elevation: 2, // subtle shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        fontFamily: 'Cookie-Regular',
    },

    subHeading: {
        fontSize: 20,
        marginBottom: 10, 
        color: '#049DD9',
        marginTop: 25,
        marginBottom: 20,
        fontFamily: 'Merriweather_24pt-Bold',
    },
    itemsView: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },

    musicContainerStyle: { 
        padding: 10, 
        backgroundColor: 'black', 
    },
    musicItem: {
        height: 1000,
        marginRight: 15,
        backgroundColor: 'yellow',
    },
    musicImage: {
        height: 100, 
        width: '100%'
    },
    musicText: {
        color: 'black'
    },
    meditationItem: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginBottom: 15,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        fontFamily: 'Merriweather_24pt-Bold',
    },

    videoHeadingView: {
        flexDirection: 'row'
    },
    meditationImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginRight: 12,
    },
    meditationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    meditationDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
        flex: 1,
    },
    source: {
        color: '#F2B84B',
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    }
}
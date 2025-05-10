// Created by Judith Kurian (B00940475)

export const Styles = {
    mainView: {
        backgroundColor: '#f8f1e4', // warm and calming base
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 18,
    },
    salutaionView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingBottom: 5,
        gap: 10,
    },
    salutation: {
        color: '#0FA644',
        fontSize: 32,
        fontFamily: 'Merriweather_24pt-Bold',
    },
    smiley: {
        height: 55,
        width: 55,
        resizeMode: 'contain',
    },
    subheadingView: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 18,
        marginTop: 18,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    subheading: {
        color: '#04B2D9',
        fontSize: 22,
        marginBottom: 12,
        fontFamily: 'Merriweather_24pt-Bold',
    },
    emotionSpheresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    emotionSphere: {
        width: 90,
        height: 90,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 5,
    },
    emotionText: {
        color: 'white',
        fontSize: 15,
        textTransform: 'capitalize',
        textAlign: 'center',
        fontFamily: 'Merriweather_24pt-Regular',
    },
    points: {
        color: '#F2B84B',
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 5,
        fontFamily: 'Merriweather_24pt-Bold',
    },
    aboutText: {
        color: '#0FA644',
        fontSize: 15,
        marginTop: 10,
        lineHeight: 22,
        fontFamily: 'Merriweather_24pt-Regular',
    },
    textView: {
        backgroundColor: '#FFF6E3',
        borderRadius: 20,
        padding: 15,
        marginTop: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#CDC1FF',
    },
    trendHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 6,
        color: '#5D6D7E',
        fontFamily: 'Merriweather_24pt-Bold',
    },
    trendScroll: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    trendBox: {
        backgroundColor: '#E3FCEF',
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
        marginRight: 5,
        alignItems: 'center',
        minWidth: 85,
    },
    trendEmotion: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0D7A5F',
        fontFamily: 'Merriweather_24pt-Regular',
    },
    trendCount: {
        fontSize: 12,
        color: '#066751',
        fontFamily: 'Merriweather_24pt-Regular',
    },
    chartLabel: {
        color: '#04B2D9',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'Merriweather_24pt-Regular',
    },
    chartContainer: {
        backgroundColor: '#CDC1FF',
        borderRadius: 16,
        marginVertical: 10,
    },
    noData: {
        color: '#999',
        marginLeft: 10,
        fontFamily: 'Merriweather_24pt-Italic',
    },
    lastSubheading: {
        marginBottom: 35
    }
};

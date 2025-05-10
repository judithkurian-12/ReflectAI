// Created by Judith Kurian (B00940475)

export const Styles = {
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 15, // For Android
        // For iOS
        shadowColor: '#000', 
        shadowOffset: { width: 15, height: 15 },
        shadowOpacity: 0.9,
        shadowRadius: 30,
        borderRadius: 30,
        paddingVertical: 40,
        marginHorizontal: 20,
        marginVertical: 55
    },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontSize: 25,
        color: '#F2B84B',
        fontWeight: 'bold',
    },
    smiley: {
        height: 38,
        width:38,
        marginTop: 5
    },
    questionView: {
        marginHorizontal: 20,
        marginTop: 50
    },
    firstQuestionView: {
        zIndex: 2
    },
    secondQuestionView: {
        zIndex: 1
    },
    question: {
        fontSize: 18,
        color: '#04B2D9',
        fontWeight: 'bold'
    },
    dropdown: {
        borderWidth: 2,
        borderColor: '#F2B84B',
        borderRadius: 10,
        marginTop: 15,
    },
    dropdownContainer: {
        borderColor: '#F2B84B',
    },
    placeholder: {
        color: '#a6acaf', // Change placeholder text color in dropdown
        fontSize: 16
    },
    badgeText: {
        color: "black", // Change text color inside selected badges in dropdown
    },
    listItems: {
        color: '#F2B84B', // Change text color of options in dropdown
        fontWeight: 'bold'
    },
    nextButton: {
        backgroundColor: '#0FA644',
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 17,
        marginTop: 55
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}
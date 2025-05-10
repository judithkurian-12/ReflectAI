// Created by Judith Kurian (B00940475)

export const Styles = {
    calendarPage: {
        flex: 1,
        backgroundColor: '#f0faff',
        alignItems: 'center',
        paddingTop: 25,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 48,
        color: '#0FA644',
        fontFamily: 'Tangerine-Bold',
        marginVertical: 15,
        textShadowColor: '#ccc',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
   pickerContainer: {
       flexDirection: 'row',
       justifyContent: 'center',
       borderRadius: 5,
       padding: 10,
       marginBottom: 20,
       gap: 10,
       elevation: 4,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 4 },
       shadowOpacity: 0.05,
       shadowRadius: 20,
       width: '80%',
       backgroundColor: '#f8f1e4',
       overflow: 'hidden',
   },

   pickerWrapper: {
       flex: 1,
       borderRadius: 20,
       overflow: 'hidden',
   },

   picker: {
       height: 50,
       width: '100%',  // ✨ FULL width of wrapper
       color: '#0FA644',
       backgroundColor: '#f8f1e4',  // optional, same as container
       marginHorizontal: 0,
   },

    monthTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#04B2D9',
        marginBottom: 10,
    },
    calendarGrid: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingBottom: 15,
        paddingTop: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    weekDaysRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dayHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#04B2D9',
        fontSize: 14,
    },
    daysContainer: {
        paddingHorizontal: 5,
    },
    emptyDay: {
        width: '13%',
        height: 75,
        margin: 1,
    },
    daysView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    day: {
        width: '12%',
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 3,
        backgroundColor: '#fdfefe',
        borderWidth: 1,
        borderColor: '#dcdde1',
    },
    dayText: {
        fontSize: 16,
        color: '#049DD9',
        fontWeight: '600',
    },
    disabledDay: {
        opacity: 0.4,
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      marginBottom: 30,
      paddingHorizontal: 10,
    },

    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },

    legendDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      marginRight: 6,
      borderWidth: 1,
      borderColor: '#ccc',
    },

    legendLabel: {
      fontSize: 15,
      color: '#555',
      fontStyle: 'italic',
    },
};

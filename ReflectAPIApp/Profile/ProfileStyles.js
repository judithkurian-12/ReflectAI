import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Gradient Header
  header: {
    height: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden',
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  headerName: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Merriweather_24pt-Bold',
    marginTop: 5,
  },

//   Floating logout icon (commented out for now)
   logoutButton: {
     position: 'absolute',
     top: 40,
     right: 20,
     backgroundColor: '#fff',
     borderRadius: 20,
     padding: 6,
     elevation: 3,
   },
  // Profile picture
  profileImageWrapper: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 4,
    elevation: 5,
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 40,
  },

  // Card for profile info
  detailsCard: {
    marginTop: 60,
    marginHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#F5F5F7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  icon: {
    width: 30,
    textAlign: 'center',
    color: '#8A2BE2',
  },

  rowText: {
    fontSize: 17,
    color: '#555',
    fontFamily: 'Merriweather_24pt-Regular',
  },

  // Edit button at the bottom
  editButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  editButton: {
    width: width * 0.5,
    paddingVertical: 10,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  gradientButton: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Merriweather_24pt-Bold',
  },
    logoutButtonContainer: {
      alignItems: 'center',
      marginTop: 10,
    },

    logoutButton: {
      width: width * 0.5,
      paddingVertical: 5,
      height: 45,
      borderRadius: 30,
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },

    gradientLogout: {
      flex: 1,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },

    logoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Merriweather_24pt-Bold',
    },

};

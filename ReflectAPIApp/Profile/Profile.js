
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { Styles } from "./ProfileStyles";
import { performLogout } from "./action";

const Profile = (props) => {

    const logout = () => {
        props.performLogout(false);
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    const edit = () => {
        props.navigation.navigate('Personal Details', { edit: true });
    }
  return (
    <ScrollView style={Styles.container}>
{/* <View style={Styles.buttonsView}>
    <TouchableOpacity style={Styles.buttons} onPress={logout}>
        <MaterialIcons name="logout" size={20} color="black"/>
        <Text style={[Styles.buttonsText]}>Logout</Text>
    </TouchableOpacity>
</View> */}

     <View style={Styles.header}>
       <LinearGradient
         colors={['#04B2D9', '#0FA644']}  // <-- UPDATED
         style={Styles.gradient}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
       />
       <Text style={Styles.headerName}>{props.user?.name}</Text>


        {/* Logout icon (optional, comment out if not using) */}
        {/* <TouchableOpacity style={Styles.logoutButton} onPress={logout}>
          <MaterialIcons name="logout" size={20} color="#8A2BE2" />
        </TouchableOpacity> */}
      </View>

      {/* Profile image */}
      <View style={Styles.profileImageWrapper}>
        <Image
          source={require('../images/user.png')}

          style={Styles.profileImage}
        />
      </View>

      {/* Info Card */}
      <View style={Styles.detailsCard}>
        <View style={Styles.row}>
          <Feather name="user" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>{props.user?.name}</Text>
        </View>
        <View style={Styles.row}>
          <Feather name="calendar" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>Age group: {props.user?.ageGroup}</Text>
        </View>
        <View style={Styles.row}>
          <Feather name="users" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>Gender: {props.user?.gender}</Text>
        </View>
        <View style={Styles.row}>
          <Feather name="map-pin" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>Country: {props.user?.country}</Text>
        </View>
        <View style={Styles.row}>
          <Feather name="arrow-up" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>Height: {props.user?.height} cm</Text>
        </View>
        <View style={Styles.row}>
          <Feather name="activity" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>Weight: {props.user?.weight} kg</Text>
        </View>
        <View style={Styles.row}>
          <Feather name="mail" size={20} style={Styles.icon} />
          <Text style={Styles.rowText}>{props.user?.email}</Text>
        </View>
      </View>

      {/* Edit button at the bottom */}
      <View style={Styles.editButtonContainer}>
        <TouchableOpacity style={Styles.editButton} onPress={edit}>
          <LinearGradient
            colors={['#04B2D9', '#0FA644']}  // <-- UPDATED
            style={Styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={Styles.editButtonText}>Edit Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Logout button just below */}
      <View style={Styles.logoutButtonContainer}>
        <TouchableOpacity style={Styles.logoutButton} onPress={logout}>
          <LinearGradient
            colors={['#04B2D9', '#0FA644']}  // <-- UPDATED
            style={Styles.gradientLogout}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={Styles.logoutButtonText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
    loginSuccess: state.onboarding?.loginSuccess,
    user: state.onboarding?.user
});

const mapDispatchToProps = {performLogout}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
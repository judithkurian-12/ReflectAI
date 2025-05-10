// Created by Judith Kurian (B00940475)

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Onboarding/Login';
import Questionaire from './Onboarding/Questionaire';
import PersonalDetails from './Onboarding/PersonalDetails';
import SignUp from './Onboarding/SignUp';
import Calendar from './Journal/Calendar';
import Journal from './Journal/Journal';
import Profile from './Profile/Profile';
import Intervention from './Intervention/Intervention';
import Home from './Home/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar';
                    }
                    else if (route.name === 'Intervention') {
                        iconName = 'heart';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#049DD9',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen 
            name="Home" 
            component={Home}   
            options={{
                headerShown: false
            }}  
            />
            <Tab.Screen 
            name="Calendar" 
            component={Calendar}   
            options={{
                headerShown: false
            }}  
            />
            <Tab.Screen 
            name="Intervention" 
            component={Intervention} 
            options={{
                headerShown: false
            }}
            />
            <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{
                headerTitleStyle: {
                    color: '#049DD9',
                    fontSize: 16,   
                    fontWeight: 'bold'
                },
            }} 
            />
        </Tab.Navigator>
    );
};

const StackNav = () => {
    return (
        <NavigationContainer>
             <Stack.Navigator>
                <Stack.Screen 
                options={{
                    headerTitleStyle: {
                        color: '#049DD9',
                        fontSize: 16,   
                        fontWeight: 'bold'
                    },
                }} 
                name="Login" 
                component={Login} 
                />
                <Stack.Screen 
                options={{
                    headerTitleStyle: {
                        color: '#049DD9',
                        fontSize: 16,   
                        fontWeight: 'bold'
                    },
                }} 
                name="Emotional Analysis" 
                component={Questionaire} 
                />
                <Stack.Screen 
                options={{
                    headerTitleStyle: {
                        color: '#049DD9',
                        fontSize: 16,   
                        fontWeight: 'bold'
                    },
                }} 
                name="Personal Details" 
                component={PersonalDetails} 
                />
                <Stack.Screen 
                options={{
                    headerTitleStyle: {
                        color: '#049DD9',
                        fontSize: 16,   
                        fontWeight: 'bold'
                    },
                }} 
                name="Sign Up" 
                component={SignUp} 
                />
                <Stack.Screen 
                    options={{ headerShown: false }} 
                    name="MainApp" 
                    component={BottomTabNav} 
                />
                <Stack.Screen 
                    options={{
                        headerTitleStyle: {
                            color: '#049DD9',
                            fontSize: 16,   
                            fontWeight: 'bold'
                        },
                    }}  
                    name="Journal" 
                    component={Journal} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNav;
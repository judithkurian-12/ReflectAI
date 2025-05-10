// Created by Judith Kurian (B00940475)

import {View, Text, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Styles } from './PersonalDetailsStyles';
import ErrorModal from '../components/ErrorModal';
import countryData from '../utils/countries';
import { setPersonalDetails } from './action';
import { updatePersonalDetails } from '../Profile/action';

const PersonalDetails = ({navigation, setPersonalDetails, route, user, updatePersonalDetails, updateSuccess}) => {

    const [value, setValue] = useState(null);
    const [gender, setGender] = useState(null);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState(false);

    const {edit} = route?.params;

    const data = [
        { label: '10-15', value: '10-15' },
        { label: '16-20', value: '16-20' },
        { label: '21-25', value: '21-25' },
        { label: '26-35', value: '26-35' },
        { label: '36-45', value: '36-45' },
        { label: '46-59', value: '46-59' },
        { label: '60+', value: '60+' },
      ];

    const genderData = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ];

    useEffect(() => {
        if (edit && user) {
            setValue(user.ageGroup || null);
            setGender(user.gender || null);
            setName(user.name || '');
            setCountry(user.country || '');
            setHeight(user.height ? String(user.height) : '');
            setWeight(user.weight ? String(user.weight) : '');
        }
    }, [edit, user]);

    const validate = () => {
        if(value===null || gender === null || name==='' || country ==='' || height ==='' || weight ==='') {
            setError(true);
        }
        else {
            setError(false);
            if(edit) {
                updatePersonalDetails ({
                    userId: user?._id,
                    ageGroup: value,
                    name,
                    gender,
                    country,
                    weight,
                    height
                })
            }
            else {
                setPersonalDetails({
                    ageGroup: value,
                    name,
                    gender,
                    country,
                    weight,
                    height
                })
            }
            if( edit && updateSuccess) {
                navigation.navigate('MainApp', { screen: 'Profile' });
            }
            else if(!edit) {
                navigation.navigate('Sign Up')
            }
        }
    }

    return (
        <ScrollView keyboardDismissMode="none" style={Styles.scroll} contentContainerStyle={Styles.containerScroll}>
            <View style={Styles.container}>
                {/* heading */}
                <View style={Styles.headingView}>
                    <Text style={Styles.heading}>Let me know you more</Text>
                    <Image source={require('../images/heart.png')} style={Styles.heart}/>
                </View>
                {/* Age */}
                <View style={Styles.questionView}>
                    <View style={Styles.questionSection}>
                        <Text style={Styles.question}>Age Group</Text>
                        <Image style={Styles.silent} source={require('../images/SilentSmiley.jpg')}/>
                    </View>
                    <Dropdown
                    style={Styles.input}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    inputSearchStyle={Styles.inputSearchStyle}
                    iconStyle={Styles.iconStyle}
                    data={data}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Select age group"
                    searchPlaceholder="Search..."
                    searchPlaceholderTextColor='silver'
                    itemTextStyle={Styles.options}
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                        style={Styles.icon}
                        name="Safety"
                        size={20}
                        />
                    )}
                    />
                </View>
                {/* Gender */}
                <View style={Styles.questionView}>
                    <View style={Styles.questionSection}>
                        <Text style={Styles.question}>Gender</Text>
                        <Image style={Styles.hiding} source={require('../images/hiding.png')}/>
                    </View>
                    <Dropdown
                    style={Styles.input}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    inputSearchStyle={Styles.inputSearchStyle}
                    iconStyle={Styles.iconStyle}
                    data={genderData}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Select gender"
                    searchPlaceholder="Search..."
                    searchPlaceholderTextColor='silver'
                    itemTextStyle={Styles.options}
                    value={gender}
                    onChange={item => {
                        setGender(item.value);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                        style={Styles.icon}
                        name="Safety"
                        size={20}
                        />
                    )}
                    />
                </View>
                {/* Country */}
                <View style={Styles.questionView}>
                    <View style={Styles.questionSection}>
                        <Text style={Styles.question}>Country of Residence</Text>
                    </View>
                    <Dropdown
                    style={Styles.input}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    inputSearchStyle={Styles.inputSearchStyle}
                    iconStyle={Styles.iconStyle}
                    data={countryData}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    searchPlaceholderTextColor='silver'
                    itemTextStyle={Styles.options}
                    value={country}
                    onChange={item => {
                        setCountry(item.value);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                        style={Styles.icon}
                        name="Safety"
                        size={20}
                        />
                    )}
                    />
                    
                </View>
                {/* Nickname */}
                <View style={Styles.questionView}>
                    <View style={Styles.questionSection}>
                        <Text style={Styles.question}>Nickname</Text>
                        <Image style={Styles.winky} source={require('../images/Winky.jpg')}/>
                    </View>
                    <TextInput 
                    style={Styles.input} 
                    placeholder="Nickname" 
                    placeholderTextColor="silver" 
                    value={name} onChangeText={(e)=>setName(e)}
                    />
                </View>
                {/* Height */}
                <View style={Styles.questionView}>
                    <View style={Styles.questionSection}>
                        <Text style={Styles.question}>Height (cm)</Text>
                        <Image style={Styles.hiding} source={require('../images/giraffe.png')}/>
                    </View>
                    <TextInput 
                    style={Styles.input} 
                    placeholder="Height (cm)" 
                    placeholderTextColor="silver" 
                    keyboardType='numeric'
                    value={height} 
                    onChangeText={(e)=>setHeight(e)}
                    />
                </View>
                {/* Width */}
                <View style={Styles.questionView}>
                    <View style={Styles.questionSection}>
                        <Text style={Styles.question}>Weight (kg)</Text>
                        <Image style={Styles.hiding} source={require('../images/muscle.png')}/>
                    </View>
                    <TextInput 
                    style={Styles.input} 
                    placeholder="Weight (kg)" 
                    placeholderTextColor="silver" 
                    keyboardType='numeric'
                    value={weight} 
                    onChangeText={(e)=>setWeight(e)}
                    />
                </View>
                {/* Next Button */}
                <TouchableOpacity style={Styles.nextButton} onPress={validate}>
                    <Text style={Styles.buttonText}>{edit ? 'Update' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
            {/* Error Modal */}
            <ErrorModal visibility={error} onDismiss={()=>setError(false)} message={"Please fill in all the boxes."}/>
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    user: state.onboarding?.user,
    updateSuccess: state.profile?.updateSuccess
});

const mapDispatchToProps = {setPersonalDetails, updatePersonalDetails}

export default connect(mapStateToProps,mapDispatchToProps)(PersonalDetails);
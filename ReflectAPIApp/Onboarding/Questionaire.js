// Created by Judith Kurian (B00940475)

import {View, Text, TouchableOpacity, Image} from 'react-native';
import { useState } from 'react';
import { connect } from 'react-redux';
import DropDownPicker from "react-native-dropdown-picker";
import { Styles } from './QuestionaireStyles';
import ErrorModal from '../components/ErrorModal';
import { setQuestionaire } from './action';
import musicData from '../utils/music';

const Questionaire = ({navigation, setQuestionaire}) => {

    const [emotion, setEmotion] = useState([]);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [moodDropdown, setMoodDropdown] = useState(false);
    const [value, setValue] = useState([]); // Multi-select values

    const options = [
        { id: '1', label: 'Happy', value: 'happy', color: '#F2B84B' },
        { id: '2', label: 'Sad', value: 'sad', color: '#F2B84B' },
        { id: '3', label: 'Angry', value: 'angry', color: '#F2B84B' },
        { id: '4', label: 'Fear', value: 'fear', color: '#F2B84B' },
        { id: '5', label: 'Disgust', value: 'disgust', color: '#F2B84B' },
        { id: '6', label: 'Surprise', value: 'surprise', color: '#F2B84B' },
        { id: '7', label: 'Neutral', value: 'neutral', color: '#F2B84B' }
    ];

    const validate = () => {
        if(emotion===null){
            setError(true);
        }
        else{
            setError(false);
            setQuestionaire({ mood: emotion, music: value });
            navigation.navigate('Personal Details',{edit:false});
        }
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.headingView}>
                <Text style={Styles.heading}>How are you feeling?</Text><Image source={require('../images/Smiley.jpg')} style={Styles.smiley} />
            </View>
            {/* First Question section */}
            <View style={[Styles.questionView, Styles.firstQuestionView]}>
                <Text style={Styles.question}>Which emotion best describes your current state now?</Text>
                <DropDownPicker
                open={moodDropdown}
                value={emotion}
                items={options}
                setOpen={setMoodDropdown}
                setValue={setEmotion}
                multiple={true}
                mode="BADGE"
                min={1} // Ensures at least one selection
                placeholder="Select mood"
                style={Styles.dropdown}
                dropDownContainerStyle={Styles.dropdownContainer}
                listItemLabelStyle={Styles.listItems}
                placeholderStyle={Styles.placeholder}
                badgeTextStyle={Styles.badgeText}
                badgeColors='#F2B84B' // Now using Styles.badge
                badgeDotColors="black"
                />
            </View>

            {/* Second question section */}
            <View style={[Styles.questionView, Styles.secondQuestionView]}>
                <Text style={Styles.question}>Your Music Preferences</Text>
                <DropDownPicker
                open={open}
                value={value}
                items={musicData}
                setOpen={setOpen}
                setValue={setValue}
                multiple={true}
                mode="BADGE"
                min={1} // Ensures at least one selection
                placeholder="Select music genres"
                style={Styles.dropdown}
                dropDownContainerStyle={Styles.dropdownContainer}
                listItemLabelStyle={Styles.listItems}
                placeholderStyle={Styles.placeholder}
                badgeTextStyle={Styles.badgeText}
                badgeColors='#F2B84B' // Now using Styles.badge
                badgeDotColors="black"
                />
            </View>

            <TouchableOpacity style={Styles.nextButton} onPress={validate}>
                <Text style={Styles.buttonText}>Next</Text>
            </TouchableOpacity>

            {/* Error Modal */}
            <ErrorModal visibility={error} onDismiss={()=>setError(false)} message={"Please select one of the option."}/>
        </View>
    )
}

const mapDispatchToProps = {setQuestionaire}

export default connect(null,mapDispatchToProps)(Questionaire);
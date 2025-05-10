// Created by Judith Kurian (B00940475)
import {
    View, TouchableOpacity, Text, Image, TextInput, ScrollView, Platform, ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect, useRef } from "react";
import { Modal } from "react-native-paper";
import DocumentPicker from "react-native-document-picker";
import { launchCamera } from "react-native-image-picker";
import { request, PERMISSIONS } from "react-native-permissions";
import Voice from "@react-native-voice/voice";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from "react-native-fs";
import { Styles } from "./JournalStyles";
import ErrorModal from "../components/ErrorModal";
import { postJournalDetails, resetStatus, getCurrentMonthPosts } from "./action";
import { formatDate, formatDateWithoutTime } from "../utils/helper";

const Journal = (props) => {
    const [modal, setModal] = useState(false);
    const [post, setPost] = useState('');
    const [attachment, setAttachment] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [journalPosts, setJournalPosts] = useState([]);
    const [audioRecordings, setAudioRecordings] = useState([]);
    const [currentAudioPath, setCurrentAudioPath] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null);
    const [loading, setLoading] = useState(false);

    const { date } = props.route.params;
    const audioRecorderPlayerRef = useRef(new AudioRecorderPlayer());
    const recordingInProgressRef = useRef(false);

    useEffect(() => {
        audioRecorderPlayerRef.current = new AudioRecorderPlayer();

        if (Voice) {
            requestPermissions();
            Voice.onSpeechStart = () => setIsRecording(true);
            Voice.onSpeechEnd = () => setIsRecording(false);
            Voice.onSpeechResults = (event) => {
                if (event.value?.length > 0) {
                    setPost((prev) => (prev || "") + (prev ? " " : "") + event.value[0]);
                }
            };
        }

        return () => {
            Voice?.destroy().then(Voice.removeAllListeners);
            if (recordingInProgressRef.current) stopRecording();
            audioRecorderPlayerRef.current?.removeRecordBackListener();
            audioRecorderPlayerRef.current?.removePlayBackListener();
        };
    }, []);

    useEffect(() => {
        if (props.journalSuccess) {
            setJournalPosts((prev) => [...prev, {
                text: post, attachments: attachment, audioRecordings, createdAt: new Date()
            }]);
            hideModal();
            setLoading(false);
            props.getCurrentMonthPosts({ userId: props.user?._id });
        } else if (props.journalError !== '') {
            setLoading(false);
            setError(true);
            setMessage(props.journalError);
        }
    }, [props.journalSuccess, props.journalError]);

    useEffect(() => {
        const filteredPosts = props.allPosts.filter(post =>
            formatDateWithoutTime(new Date(post.createdAt)) === date
        );
        setJournalPosts(filteredPosts);
    }, [props.allPosts]);

    const hideModal = () => {
        props.resetStatus();
        setModal(false);
        setAttachment([]);
        setAudioRecordings([]);
        setPost('');
        setMessage('');
        setError(false);
        setCurrentAudioPath(null);
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android") {
            await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
            await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        } else {
            await request(PERMISSIONS.IOS.MICROPHONE);
        }
    };

    const saveImageToDevice = async (uri) => {
        const fileName = uri.substring(uri.lastIndexOf('/') + 1);
        const destination = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.copyFile(uri, destination);
        setAttachment(prev => [...prev, `file://${destination}`]);
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({ type: [DocumentPicker.types.images] });
            if (result?.length > 0) await saveImageToDevice(result[0].uri);
        } catch (err) { console.error(err); }
    };

    const captureMedia = async () => {
        launchCamera({ mediaType: "photo", saveToPhotos: false }, async (response) => {
            if (response.assets?.length > 0) {
                await saveImageToDevice(response.assets[0].uri);
            }
        });
    };

    const startRecording = async () => {
        if (recordingInProgressRef.current) return;
        await requestPermissions();
        const path = Platform.select({
            ios: `${RNFS.DocumentDirectoryPath}/voice_${Date.now()}.m4a`,
            android: `${RNFS.DocumentDirectoryPath}/voice_${Date.now()}.mp3`
        });
        setCurrentAudioPath(path);
        recordingInProgressRef.current = true;
        await audioRecorderPlayerRef.current.startRecorder(path);
        setIsRecording(true);
    };

    const stopRecording = async () => {
        if (!recordingInProgressRef.current) return;
        await audioRecorderPlayerRef.current.stopRecorder();
        audioRecorderPlayerRef.current.removeRecordBackListener();
        setIsRecording(false);
        recordingInProgressRef.current = false;
        if (currentAudioPath) {
            setAudioRecordings(prev => [...prev, currentAudioPath]);
            setCurrentAudioPath(null);
        }
    };

    const postJournal = () => {
        if (post.trim() || attachment.length || audioRecordings.length) {
            setLoading(true);
            props.postJournalDetails({
                text: post,
                attachments: attachment,
                audioRecordings,
                userId: props.user?._id,
                createdAt: new Date()
            });
        }
    };

    const playAudio = async (path) => {
        if (isPlaying && currentPlayingAudio === path) {
            await audioRecorderPlayerRef.current.pausePlayer();
            setIsPlaying(false);
            return;
        }
        if (!isPlaying && currentPlayingAudio === path) {
            await audioRecorderPlayerRef.current.resumePlayer();
            setIsPlaying(true);
            return;
        }
        if (currentPlayingAudio && currentPlayingAudio !== path) {
            await audioRecorderPlayerRef.current.stopPlayer();
            audioRecorderPlayerRef.current.removePlayBackListener();
        }

        await audioRecorderPlayerRef.current.startPlayer(path);
        setCurrentPlayingAudio(path);
        setIsPlaying(true);

        audioRecorderPlayerRef.current.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
                audioRecorderPlayerRef.current.stopPlayer();
                audioRecorderPlayerRef.current.removePlayBackListener();
                setIsPlaying(false);
                setCurrentPlayingAudio(null);
            }
        });
    };

    return (
        <View style={Styles.mainView}>
            <ScrollView style={Styles.postScroll}>
                {journalPosts.length > 0 ? journalPosts.map((journal, index) => (
                    <View key={index} style={Styles.mainPostView}>
                        <Text style={Styles.dateTime}>{formatDate(journal.createdAt)}</Text>
                        <View style={Styles.postView}>
                            {journal.text.trim() !== '' && <Text style={Styles.postText}>{journal.text}</Text>}
                            {journal.attachments.map((file, idx) => (
                                <Image key={idx} source={{ uri: file }} style={Styles.imagePreview} />
                            ))}
                            {journal.audioRecordings.map((audioPath, idx) => (
                                <View key={idx} style={Styles.audioContainerMain}>
                                    <Text style={Styles.audioLabel}>Voice Note {idx + 1}</Text>
                                    <TouchableOpacity onPress={() => playAudio(audioPath)} style={Styles.audioControls}>
                                        <FontAwesome name={currentPlayingAudio === audioPath && isPlaying ? "pause-circle-o" : "play-circle-o"} size={30} color="black" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                )) : (
                    <View style={Styles.noPostsView}>
                        <Image source={require('../images/crying.png')} style={Styles.crying} />
                        <Text style={Styles.noPosts}>No posts to show</Text>
                    </View>
                )}
            </ScrollView>

            {date === formatDateWithoutTime(new Date()) && (
                <TouchableOpacity style={Styles.postButton} onPress={() => setModal(true)}>
                    <MaterialIcons name="post-add" size={24} color="black" />
                    <Text style={Styles.newPost}>New Post</Text>
                </TouchableOpacity>
            )}

            {modal && (
                <View style={Styles.modalOverlay}>
                    <Modal visible={modal} contentContainerStyle={Styles.containerStyle}>
                        <ScrollView contentContainerStyle={Styles.scrollStyle}>
                            <TextInput
                                multiline={true}
                                numberOfLines={100}
                                style={Styles.input}
                                value={post}
                                onChangeText={setPost}
                            />

                            {attachment.map((file, index) => (
                                <View key={index} style={Styles.mediaView}>
                                    <Image source={{ uri: file }} style={Styles.imagePreview} />
                                    <TouchableOpacity style={Styles.deleteView} onPress={() => setAttachment(att => att.filter((_, i) => i !== index))}>
                                        <AntDesign name="delete" size={20} color="#cb4335" />
                                        <Text style={Styles.deleteText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {audioRecordings.map((audioPath, idx) => (
                                <View key={idx} style={Styles.audioContainer}>
                                    <Text style={Styles.audioLabel}>Voice Note {idx + 1}</Text>
                                    <TouchableOpacity onPress={() => playAudio(audioPath)} style={Styles.audioControls}>
                                        <FontAwesome name={currentPlayingAudio === audioPath && isPlaying ? "pause-circle-o" : "play-circle-o"} size={30} color="black" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Styles.deleteView} onPress={() => setAudioRecordings(rec => rec.filter((_, i) => i !== idx))}>
                                        <AntDesign name="delete" size={25} color="#cb4335" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={Styles.iconsView}>
                            <TouchableOpacity style={Styles.icon} onPress={pickDocument}>
                                <Entypo name="image" size={13} color="black" style={Styles.iconImage} />
                                <Text style={Styles.iconText}>Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.icon} onPress={captureMedia}>
                                <MaterialCommunityIcons name="camera-plus" size={13} color="black" style={Styles.iconImage} />
                                <Text style={Styles.iconText}>Capture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    Styles.icon,
                                    { backgroundColor: isRecording ? '#f8d7da' : '#ffffff' }
                                ]}
                                onPress={isRecording ? stopRecording : startRecording}
                            >
                                <MaterialIcons
                                    name="keyboard-voice"
                                    size={13}
                                    color={isRecording ? '#c0392b' : 'black'}
                                    style={Styles.iconImage}
                                />
                                <Text style={[
                                    Styles.iconText,
                                    { color: isRecording ? '#c0392b' : 'black' }
                                ]}>
                                    {isRecording ? "Stop" : "Record"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.buttonsView}>
                            <TouchableOpacity
                                style={[Styles.sendButton, Styles.modalButtons]}
                                onPress={postJournal}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="black" />
                                ) : (
                                    <>
                                        <FontAwesome name="send-o" size={20} color="black" />
                                        <Text style={Styles.modalButtonText}>Post</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={[Styles.closeButton, Styles.modalButtons]} onPress={hideModal}>
                                <AntDesign name="closecircle" size={20} color="black" />
                                <Text style={Styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            )}

            <ErrorModal visibility={error} onDismiss={() => setError(false)} message={message} />
        </View>
    );
};

const mapStateToProps = (state) => ({
    user: state.onboarding?.user,
    journalError: state.journaling?.journalError,
    journalSuccess: state.journaling?.journalSuccess,
    allPosts: state.journaling?.allPosts,
});

const mapDispatchToProps = { postJournalDetails, resetStatus, getCurrentMonthPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
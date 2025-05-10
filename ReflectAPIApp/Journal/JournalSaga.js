// Created by Judith Kurian (B00940475)

import { all, put, takeLatest, select } from 'redux-saga/effects';
import { PATHS } from '../utils/constants';
import { postCall } from '../utils/apiCalls';

export function* postJournal(payload) {
    // Emotional Analysis 
    try {
        let allTextEmotions = null;
        let allImageEmotions = null;
        let allAudioEmotions = null;
        let allEmotions = null;

        // Text analysis
        if(payload.params.text) {
            let aiParam = {text: payload.params.text};
            let aiResponse = yield postCall(PATHS.AI_PATH,aiParam);
            if(aiResponse) {
                let data = yield aiResponse.json();
                const emojiEmotions = data?.emoji_moods;
                // Keeping only emotions with > 0.5 confidence
                const textEmotions = data?.text_emotions?.filter(item => item.confidence > 0.5).map(item => item.emotion);
                allTextEmotions = [...emojiEmotions, ...textEmotions];
            }
            else {
                console.log("AI Response Error for text analysis: ", yield aiResponse.json());
            }
        }
        //Image Analysis
        if (payload.params.attachments.length > 0) {
            const formData = new FormData();
        
            payload.params.attachments.forEach((uri, index) => {
                let fileName = uri.split('/').pop() || `image_${index}.jpg`;
            
                // Ensuring fileName has a valid image extension
                const hasExtension = fileName.includes('.') && /\.(jpg|jpeg|png)$/i.test(fileName);
                if (!hasExtension) {
                    fileName += '.jpg'; // fallback
                }
            
                const extension = fileName.split('.').pop().toLowerCase();
                let mimeType = 'image/jpeg';
            
                if (extension === 'png') mimeType = 'image/png';
                else if (extension === 'jpg' || extension === 'jpeg') mimeType = 'image/jpeg';
                else {
                    console.warn(`Skipping unsupported file: ${fileName}`);
                    return;
                }
            
                console.log('Appending file:', { uri, fileName, mimeType });
            
                formData.append('files', {
                    uri: uri.startsWith('file://') ? uri : 'file://' + uri,
                    name: fileName,
                    type: mimeType,
                });
            });               
                            
            try {
                const aiResponse = yield fetch(PATHS.AI_IMAGE_PATH, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                    },
                });
                if (aiResponse.ok) {
                    const data = yield aiResponse.json();
                    // Keeping only emotions with > 0.5 confidence
                    allImageEmotions = data?.predicted_emotions?.filter(item => item.confidence > 0.5).map(item => item.emotion);
                } else {
                    console.log("AI Response Error for image analysis: ", yield aiResponse.json());
                }
            }
            catch (err) {
                console.error("Error uploading image: ", err);
            }
        }
        //Audio Analysis
        if(payload.params.audioRecordings) {
            if(payload.params.audioRecordings && payload.params.audioRecordings.length > 0) {
                const audioFormData = new FormData();
                
                payload.params.audioRecordings.forEach((audioPath, index) => {
                    let fileName = audioPath.split('/').pop() || `audio_${index}.mp3`;
                    
                    // Ensure fileName has a valid audio extension
                    const hasExtension = fileName.includes('.') && /\.(mp3|m4a|wav)$/i.test(fileName);
                    if (!hasExtension) {
                        fileName += Platform.OS === 'ios' ? '.m4a' : '.mp3'; // fallback based on platform
                    }
                    
                    const extension = fileName.split('.').pop().toLowerCase();
                    let mimeType = 'audio/mpeg';
                    
                    if (extension === 'm4a') mimeType = 'audio/mp4';
                    else if (extension === 'wav') mimeType = 'audio/wav';
                    else if (extension === 'mp3') mimeType = 'audio/mpeg';
                    else {
                        console.warn(`Skipping unsupported audio file: ${fileName}`);
                        return;
                    }
                    
                    console.log('Appending audio file:', { audioPath, fileName, mimeType });
                    
                    audioFormData.append('files', {
                        uri: audioPath.startsWith('file://') ? audioPath : 'file://' + audioPath,
                        name: fileName,
                        type: mimeType,
                    });
                });
                
                try {
                    const aiResponse = yield fetch(PATHS.AI_AUDIO_PATH, {
                        method: 'POST',
                        body: audioFormData,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    
                    if (aiResponse.ok) {
                        const data = yield aiResponse.json();
                        // Keeping only emotions with > 0.5 confidence
                        allAudioEmotions = data?.filter(item => item.confidence > 0.5).map(item => item.predicted_emotion);
                    } else {
                        console.log("AI Response Error for audio analysis: ", yield aiResponse.json());
                    }
                } catch (err) {
                    console.error("Error uploading audio: ", err);
                }
            }
        }

        //Combining the analysis results and creating the post
        if(allImageEmotions?.length>0 || allTextEmotions?.length>0 || allAudioEmotions?.length>0) {
            allImageEmotions = allImageEmotions || [];
            allTextEmotions = allTextEmotions || [];
            allAudioEmotions = allAudioEmotions || [];

            allEmotions = [...new Set([...allImageEmotions, ...allTextEmotions, ...allAudioEmotions])];
            const moodData = { userId: payload?.params?.userId, mood: allEmotions };
            const moodResponse = yield postCall(PATHS.DEFAULT_PATH + '/users/update-mood', moodData);
            if (moodResponse) {
                yield put({ type: 'set_mood', mood: allEmotions });
            }
        }

        let moodParam= {mood: allEmotions};
        let postParams = {...payload.params, ...moodParam};
        //Journal posting
        let response = yield postCall(PATHS.DEFAULT_PATH+'/journals/create-post',postParams);
        if(response.ok) {
            yield put({type: 'journal_status', status: true, msg:'' });                       
        }
        else{
            let errorMsg = yield response.json();
            yield put({type: 'journal_status', status: false, msg: errorMsg });
        }   
    }
    catch(e) {
        console.log(e);
    }
}

export function* resetStatus() {
    yield put({type: 'reset_post_status'});
}

export function* fetchAllPosts(payload) {
    let response = yield postCall(PATHS.DEFAULT_PATH+'/journals/all-posts', payload.params);
    if(response.ok) {
        let posts = yield response.json();
        yield put({type: 'set_all_posts', posts});
    }
}

export function* getCurrentMonthPosts(payload) {
    try {   
        let response = yield postCall(PATHS.DEFAULT_PATH+'/journals/month-posts', payload.params);
        if(response.ok) {
            let data = yield response.json();
            yield put({type: 'set_month_posts', data});
        }
    }
    catch (e) {
        console.log(e);
    }
}

export default function* journalingSaga() {
    yield all([
        takeLatest('post_journal', postJournal),
        takeLatest('reset_status', resetStatus),
        takeLatest('get_all_posts', fetchAllPosts),
        takeLatest('get_current_month_posts', getCurrentMonthPosts),
    ]);
}
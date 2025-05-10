// Created by Judith Kurian (B00940475)

import { all, put, takeLatest, select } from 'redux-saga/effects';
import { PATHS } from '../utils/constants';
import { postCall } from '../utils/apiCalls';

const selectOnboardingData = (state) => state.onboarding;

export function* setQuestionaire(payload){
    try {
        yield put({type: 'set_questionaire_answers', payload})
    }
    catch(e) {
        console.log(e);
    }
}

export function* setPersonalDetails(payload){
    try {
        yield put({type: 'set_details', details: payload.params})
    }
    catch(e) {
        console.log(e);
    }
}

export function* setCredentials(payload){
    try {
        const onboardingData = yield select(selectOnboardingData);
        let credentials = payload?.params
         // Merge all data into a single object
         const userData = {
            ...onboardingData.personalDetails, 
            ...onboardingData.questionaireAnswers, 
            ...credentials
        };
        let response = yield postCall(PATHS.DEFAULT_PATH+'/users/add-user',userData);
        if(response.ok) {
            let data = yield response.json();
            yield put({type: 'set_sign_up_credentials', user: data.user});
        }
        if(!response.ok){
            let errorMsg = yield response.json();
            yield put({type: 'sign_up_error', error: errorMsg.error});
        }     
    }
    catch(e) {
        console.log(e);
    }
}

export function* login(payload){
    try {
        let response = yield postCall(PATHS.DEFAULT_PATH+'/users/login',payload.params);
        if(response.ok){
            let data = yield response.json();
            yield put({type: 'login', user: data.user});
        }
        else{
            let errorMsg = yield response.json();
            yield put({type: 'login_error', error: errorMsg.error});
        }     
    }
    catch(e) {
        console.log(e);
    }
}

export function* resetLoginError() {
    yield put({type: 'reset_login_error_msg'});
}

export function* resetSignupError() {
    yield put({type: 'reset_signup_error_msg'});
}

export function* performLogout(payload){
    try {
        yield put({type: 'logout', payload});  
        yield put({type: 'reset_signup_error_msg'});  
    }
    catch(e) {
        console.log(e);
    }
}

export default function* onboardingSaga() {
    yield all([
        takeLatest('set_questionaire', setQuestionaire),
        takeLatest('set_personal_details', setPersonalDetails),
        takeLatest('set_credentials', setCredentials),
        takeLatest('set_login', login),
        takeLatest('reset_login_error', resetLoginError),
        takeLatest('reset_signup_error', resetSignupError),
        takeLatest('perform_logout', performLogout)

    ]);
}
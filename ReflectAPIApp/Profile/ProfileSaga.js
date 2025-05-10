// Created by Judith Kurian (B00940475)

import { all, put, takeLatest } from 'redux-saga/effects';
import { PATHS } from '../utils/constants';
import { postCall } from '../utils/apiCalls';

export function* updatePersonalDetails(payload) {
    try {
        let response = yield postCall(PATHS.DEFAULT_PATH+'/users/update',payload.params);
        if(response.ok) {
            let data = yield response.json();
            yield put({type: 'update_success', status: true});
            yield put({type: 'set_user', details: data.user});
        }
        else {
            yield put({type: 'update_success', status: false});
        }    
    }
    catch (e) {
        console.log(e);
    }
}

export default function* profileSaga() {
    yield all([
        takeLatest('update_personal_details', updatePersonalDetails),
    ])
}
// Created by Judith Kurian (B00940475)

import { all, put, takeLatest } from 'redux-saga/effects';
import { postCall } from '../utils/apiCalls';

export function* getQuote(payload) {
    try {   
        let response = yield postCall(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyD1qde833OGS1VxPInAyejd-BPeyf60N5E',
            payload.params
        );
        if(response.ok) {
            let data = yield response.json();
            let quote = data.candidates[0].content.parts[0].text;
            yield put({type: 'set_quote', quote});
        }
    }
    catch (e) {
        console.log(e);
    }
}

export default function* interventionSaga() {
    yield all([
        takeLatest('get_quote', getQuote),
    ])
}
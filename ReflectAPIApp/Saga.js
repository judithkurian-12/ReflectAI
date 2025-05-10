// Created by Judith Kurian (B00940475)

import { all } from "redux-saga/effects";
import onboardingSaga from "./Onboarding/OnboardingSaga";
import profileSaga from "./Profile/ProfileSaga";
import journalingSaga from "./Journal/JournalSaga";
import interventionSaga from "./Intervention/InterventionSaga";

export default function* rootSaga() {
	yield all([
		onboardingSaga(),
		profileSaga(),
		journalingSaga(),
		interventionSaga()
	]);
}
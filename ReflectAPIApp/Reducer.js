// Created by Judith Kurian (B00940475)

import { combineReducers } from "redux";
import onboardingReducer from "./Onboarding/OnboardingReducer";
import journalReducer from "./Journal/JournalReducer";
import profileReducer from "./Profile/ProfileReducer";
import interventionReducer from "./Intervention/InterventionReducer";

const rootReducer = combineReducers({
    onboarding: onboardingReducer,
    journaling: journalReducer,
    profile: profileReducer,
    intervention: interventionReducer
})

export default rootReducer;
// Created by Judith Kurian (B00940475)

const INITIAL_STATE = {
    questionaireAnswers: null,
    personalDetails: null,
    user: null,
    loginSuccess: false,
    loginError: '',
    signUpError: ''
}

const onboardingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'set_questionaire_answers': return {
            ...state, 
            questionaireAnswers: action.payload.params
        };
        case 'set_details': return {
            ...state, 
            personalDetails: action.details
        };
        case 'set_sign_up_credentials': return {
            ...state, 
            user: action.user
        };
        case 'sign_up_error': return {
            ...state,
            signUpError: action.error
        };
        case 'reset_signup_error_msg': return {
            ...state,
            signUpError: ''
        };
        case 'login': return {
            ...state, 
            loginSuccess: true,
            loginError: '',
            user: action.user
        };
        case 'login_error': return {
            ...state, 
            loginError: action.error
        };
        case 'reset_login_error_msg': return {
            ...state,
            loginError: ''
        };
        case 'set_user': return {
            ...state,
            user: action.details
        };
        case 'set_mood': return {
            ...state,
            user: {
                ...state.user,
                mood: action.mood
            }
        };
        case 'logout': return {
            ...state, 
            loginSuccess: action.payload,
            questionaireAnswers: null,
            user: null,
            personalDetails: null,
            signUpError: ''
        };
        default:
            return state; 
    }
}

export default onboardingReducer;
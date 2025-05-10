// Created by Judith Kurian (B00940475)

export const setLogin = (params) => {
    return {
        type: 'set_login',
        params
    }
}

export const setQuestionaire = (params) => {
    return {
        type: 'set_questionaire',
        params
    }
} 

export const setPersonalDetails = (params) => {
    return {
        type: 'set_personal_details',
        params
    }
}

export const setCredentials = (params) => {
    return {
        type: 'set_credentials',
        params
    }
}

export const resetLoginError = () => {
    return { 
        type: 'reset_login_error',
    }
}

export const resetSignUpError = () => {
    return {
        type: 'reset_signup_error'
    }
}
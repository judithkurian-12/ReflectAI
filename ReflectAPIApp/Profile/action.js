export const performLogout = (params) => {
    return {
        type: 'perform_logout',
        params
    }
}

export const updatePersonalDetails = (params) => {
    return {
        type: 'update_personal_details',
        params
    }
}
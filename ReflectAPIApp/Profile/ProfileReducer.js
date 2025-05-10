// Created by Judith Kurian (B00940475)

const INITIAL_STATE = {
    updateSuccess: false
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'update_success': return {
            ...state, 
            updateSuccess: action.status
        };
        default:
            return state; 
    }
}

export default profileReducer;
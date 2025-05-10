// Created by Judith Kurian (B00940475)

const INITIAL_STATE = {
    quote: ''
}

const interventionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'set_quote': return {
            ...state, 
            quote: action.quote
        };
        default:
            return state; 
    }
}

export default interventionReducer;
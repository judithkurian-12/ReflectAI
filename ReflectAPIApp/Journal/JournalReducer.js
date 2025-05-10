// Created by Judith Kurian (B00940475)

const INITIAL_STATE = {
    journalError: '',
    journalSuccess: false,
    posts: [],
    allPosts: [],
    monthPosts: []
}

const journalReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'journal_status': return {
            ...state, 
            journalError: action.error,
            journalSuccess: action.status
        };
        case 'reset_post_status': return {
            ...state,
            journalError: '',
            journalSuccess: false
        };
        case 'set_all_posts': return {
            ...state,
            allPosts:action.posts
        };
        case 'set_month_posts': return {
            ...state,
            monthPosts: action.data
        };
        default:
            return state; 
    }
}

export default journalReducer;
export const postJournalDetails = (params) => {
    return {
        type: 'post_journal', 
        params 
    }
}

export const resetStatus = () => {
    return {
        type: 'reset_status',
    }
}

export const getAllPosts = (params) => {
    return {
        type: 'get_all_posts',
        params
    }
}

export const getCurrentMonthPosts = (params) => {
    return {
        type: 'get_current_month_posts',
        params
    }
}
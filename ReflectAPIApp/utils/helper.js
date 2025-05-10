// Created by Judith Kurian (B00940475)

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;
    return regex.test(password);
}

export const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    });
};

export const formatDateWithoutTime = (date) => {
    return new Date(date).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
};
export const validatePassword = (password) =>{
    const minLength = 8;
    const maxLength = 15;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const errors = [];

    if(password.length < minLength) errors.push('At least 8 characters');
    if(password.length > maxLength) errors.push('Maximum 15 characters');
    if(!hasUppercase) errors.push('At least one uppercase');
    if(!hasLowercase) errors.push('At least one lowercase');
    if(!hasNumber) errors.push('At least number');
    if(!hasSpecialCharacter) errors.push('At least one special character');
    return errors;
}
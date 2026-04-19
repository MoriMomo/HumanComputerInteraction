const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
    return EMAIL_REGEX.test(email.trim());
}

export function validatePassword(password: string) {
    return password.length >= 8;
}

export function validateName(name: string) {
    const trimmedName = name.trim();
    return trimmedName.length >= 2 && trimmedName.length <= 80;
}

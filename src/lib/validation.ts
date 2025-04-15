
// Form validation utilities

/**
 * Validates an email address
 * @param email Email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password
 * @param password Password to validate
 * @param minLength Minimum length required (default: 6)
 * @returns True if the password is valid, false otherwise
 */
export const isValidPassword = (password: string, minLength: number = 6): boolean => {
  return password.length >= minLength;
};

/**
 * Gets error message for email validation
 * @param email Email to validate
 * @returns Error message or empty string if valid
 */
export const getEmailError = (email: string): string => {
  if (!email) {
    return "Email is required";
  }
  
  if (!isValidEmail(email)) {
    return "Please enter a valid email address";
  }
  
  return "";
};

/**
 * Gets error message for password validation
 * @param password Password to validate
 * @param minLength Minimum length required (default: 6)
 * @returns Error message or empty string if valid
 */
export const getPasswordError = (password: string, minLength: number = 6): string => {
  if (!password) {
    return "Password is required";
  }
  
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters`;
  }
  
  return "";
};

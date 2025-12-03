/**
 * Validation utility functions for form validation
 */

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = email => {
    if (!email || email.trim() === "") {
        return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    return null;
};

/**
 * Validates required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
        return `${fieldName} is required`;
    }

    return null;
};

/**
 * Validates string length
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateLength = (value, min, max, fieldName) => {
    if (!value) return null; // Skip if empty (use validateRequired separately)

    const length = value.trim().length;

    if (min !== undefined && length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }

    if (max !== undefined && length > max) {
        return `${fieldName} must be at most ${max} characters`;
    }

    return null;
};

/**
 * Validates pattern match
 * @param {string} value - Value to validate
 * @param {RegExp} pattern - Pattern to match
 * @param {string} errorMessage - Error message if pattern doesn't match
 * @returns {string|null} Error message or null if valid
 */
export const validatePattern = (value, pattern, errorMessage) => {
    if (!value) return null; // Skip if empty

    if (!pattern.test(value)) {
        return errorMessage;
    }

    return null;
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = password => {
    if (!password || password.trim() === "") {
        return "Password is required";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    return null;
};

/**
 * Validates password match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {string|null} Error message or null if valid
 */
export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return null;
};

/**
 * Parses backend validation errors from API response
 * @param {Error} error - Axios error object
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const parseBackendErrors = error => {
    const errors = {};

    if (error.response?.data) {
        const data = error.response.data;

        // Check if it's a validation error with violations
        if (data.violations && typeof data.violations === "object") {
            return data.violations;
        }

        // Check if there's a general message
        if (data.message) {
            errors.general = data.message;
        }
    }

    return errors;
};

/**
 * Validates a number is within range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateRange = (value, min, max, fieldName) => {
    if (value === undefined || value === null || value === "") return null;

    const numValue = Number(value);

    if (isNaN(numValue)) {
        return `${fieldName} must be a number`;
    }

    if (min !== undefined && numValue < min) {
        return `${fieldName} must be at least ${min}`;
    }

    if (max !== undefined && numValue > max) {
        return `${fieldName} must be at most ${max}`;
    }

    return null;
};

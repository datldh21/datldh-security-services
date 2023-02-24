const isStrongPassword = ({ password }) => {
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[$-/:-?{-~!"^_`\[\]]/;

    if (password.length < 8) {
        return false;
    }

    if (!lowerCaseRegex.test(password)) {
        return false;
    }

    if (!upperCaseRegex.test(password)) {
        return false;
    }

    if (!digitRegex.test(password)) {
        return false;
    }

    if (!specialCharRegex.test(password)) {
        return false;
    }

    return true;
};

module.exports = { isStrongPassword };

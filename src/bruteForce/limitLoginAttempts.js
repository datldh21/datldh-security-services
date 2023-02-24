const limitLoginAttempts = ({ password, attempts, lockoutTime }) => {
    if (attempts >= 3) {
        // Check if the lockout time has expired
        const now = new Date();
        const lastAttemptTime = new Date(attempts[attempts.length - 1]);
        const timeDiff = now.getTime() - lastAttemptTime.getTime();
        const timeDiffInMinutes = timeDiff / 1000 / 60;

        if (timeDiffInMinutes < lockoutTime) {
            // Lock the account
            return true;
        }
    }

    return false;
};

module.exports = { limitLoginAttempts };

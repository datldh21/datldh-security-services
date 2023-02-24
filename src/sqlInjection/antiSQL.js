const antiSQL = ({ input }) => {
    let sanitizedString = input.replace(/['";:,.\/?\\-]/g, "");
    sanitizedString = sanitizedString.replace(/[(){}\[\]]/g, "");

    return sanitizedString;
};

module.exports = { antiSQL };

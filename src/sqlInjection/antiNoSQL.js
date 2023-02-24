const antiNoSQL = ({ input }) => {
    let sanitizedString = input.replace(/[$&+,:;=?@#|'<>.^*()%!-]/g, "");

    return sanitizedString;
};

module.exports = { antiNoSQL };

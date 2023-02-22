const antiSQL = ({ input }) => {
    // Ensure the input is a string
    input = String(input);

    // Remove any characters that could be used in a SQL injection attack
    input = input.replace(/['";]/g, "");

    return input;
};

module.exports = { antiSQL };

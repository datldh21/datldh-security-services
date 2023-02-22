const antiNoSQL = ({ input }) => {
    // Ensure the input is a string
    input = String(input);

    // Remove any characters that could be used in a NoSQL injection attack
    input = input.replace(/[\$\\]/g, "");

    return input;
};

module.exports = { antiNoSQL };

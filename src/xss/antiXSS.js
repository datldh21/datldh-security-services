function customizeEncodeURIComponent(str) {
    // Convert string to an array of Unicode characters
    let chars = Array.from(str);
    // Browse every character by character and encode special characters
    let encodedChars = chars.map((char) => {
        if (/[^\w-.~]/.test(char)) {
            // If the character is not an alphabetic character, a number, a dash, a period, an underscore, or a double dash, encode it
            return encodeURIComponent(char).replace(/%([0-9A-F]{2})/g, "%$1");
        } else {
            // If the character is an alphabetic character, a number, a dash, a period, an underscore, or a double dash, no encoding is required.
            return char;
        }
    });
    // Convert array of encoded characters to string
    return encodedChars.join("");
}

const antiXSS = ({ input }) => {
    const filterInput = customizeEncodeURIComponent(input);
    return filterInput.replace(/<|>/g, function (match) {
        return match === "<" ? "&lt;" : "&gt;";
    });
};

module.exports = { antiXSS };

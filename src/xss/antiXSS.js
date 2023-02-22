const antiXSS = ({ input }) => {
    return input.replace(/<|>/g, function (match) {
        return match === "<" ? "&lt;" : "&gt;";
    });
};

module.exports = { antiXSS };

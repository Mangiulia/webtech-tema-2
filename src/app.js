/**
 * The function generates an HTML-like string by replacing markers in the input object with values.
 * @param {object} input - JavaScript object representing a hierarchical structure with string values containing markers
 * @param {object} values - Key-value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    
    if (typeof input !== 'object' || typeof values !== 'object') {
        throw new Error('InvalidType');
    }

    
    const substituteTokens = (str, values) => {
        const regex = /\${([^}]+)}/g;
        return str.replace(regex, (_, token) => values[token] || '');
    };

    
    const processObject = (obj, values) => {
        let result = '';
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    result += `<${key}>${processObject(obj[key], values)}</${key}>`;
                } else if (typeof obj[key] === 'string') {
                    result +=  `<${key}>${substituteTokens(obj[key], values)}</${key}>`                     
                }
            }
        }
        return result;
    };

   
    const result = processObject(input, values);

    
    return result;
}

module.exports = {
    render
};

/**
 * Parse options argument and Returns an Options Object
 * 
 * Options Object Definition { capitalize: Boolean, humanize: Boolean }
 * 
 * @param {object} [options] Optional Object { [capitalize]: Boolean, [humanize]: Bolean } 
 * @returns {object} Options Object 
 */
export const parse_options = (options: any) => {
    return {
        capitalize_option: options && options.capitalize ? options.capitalize : false,
        humanize_option: options && options.humanize ? options.humanize : false
    };
};

/**
 * Capitalizes the first character of a text
 * 
 * @param {string} text 
 * @returns {string}
 */
export const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Replaces all underscores with a white space
 * 
 * @param {string} text 
 * @returns {string}
 */
export const humanize = (text: string): string => {
    return text.split("_").join(" ").trim();
};